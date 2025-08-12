import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult, type UseQueryOptions } from "@tanstack/react-query";
import type { Selectable } from "kysely";
import type { Jobs } from "./postgresqlDatabaseSchema";
import { getJobs, InputType as GetJobsInput, OutputType as GetJobsOutput } from "../endpoints/jobs_GET.schema";
import { getJob, InputType as GetJobInput, OutputType as GetJobOutput } from "../endpoints/job_GET.schema";
import { postJobs, InputType as CreateJobInput } from "../endpoints/jobs_POST.schema";
import { postJobsUpdate, InputType as UpdateJobInput } from "../endpoints/jobs/update_POST.schema";
import { postJobsDelete, InputType as DeleteJobInput } from "../endpoints/jobs/delete_POST.schema";
import { toast } from "sonner";

export const jobsQueryKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobsQueryKeys.all, "list"] as const,
  list: (filters: GetJobsInput) => [...jobsQueryKeys.lists(), filters] as const,
  details: () => [...jobsQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...jobsQueryKeys.details(), id] as const,
};

export const useGetJobs = (filters: GetJobsInput = {}): UseQueryResult<GetJobsOutput, Error> => {
  return useQuery({
    queryKey: jobsQueryKeys.list(filters),
    queryFn: () => getJobs(filters),
  });
};

export const useGetJobById = (jobId: number, options?: Omit<UseQueryOptions<GetJobOutput, Error, GetJobOutput>, 'queryKey' | 'queryFn'>): UseQueryResult<GetJobOutput, Error> => {
  return useQuery({
    queryKey: jobsQueryKeys.detail(jobId),
    queryFn: () => getJob({ id: jobId }),
    ...options,
  });
};

export const useCreateJob = (): UseMutationResult<Selectable<Jobs>, Error, CreateJobInput> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJobs,
    onSuccess: (newJob) => {
      toast.success("Job posting created successfully!");
      queryClient.invalidateQueries({ queryKey: jobsQueryKeys.lists() });
    },
    onError: (error) => {
      toast.error(`Failed to create job: ${error.message}`);
    },
  });
};

export const useUpdateJob = (): UseMutationResult<Selectable<Jobs>, Error, UpdateJobInput> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJobsUpdate,
    onSuccess: (updatedJob) => {
      toast.success("Job posting updated successfully!");
      // Invalidate all job list queries to refetch
      queryClient.invalidateQueries({ queryKey: jobsQueryKeys.lists() });
      // Update the specific job detail query cache
      queryClient.setQueryData(jobsQueryKeys.detail(updatedJob.id), { job: updatedJob });
    },
    onError: (error) => {
      toast.error(`Failed to update job: ${error.message}`);
    },
  });
};

export const useDeleteJob = (): UseMutationResult<unknown, Error, DeleteJobInput> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJobsDelete,
    onMutate: async (deleteInput) => {
      await queryClient.cancelQueries({ queryKey: jobsQueryKeys.all });

      const previousJobsData = queryClient.getQueriesData<GetJobsOutput>({ queryKey: jobsQueryKeys.lists() });

      queryClient.setQueriesData<GetJobsOutput>({ queryKey: jobsQueryKeys.lists() }, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          jobs: oldData.jobs.filter((job) => job.id !== deleteInput.jobId),
          totalCount: oldData.totalCount - 1,
        };
      });

      return { previousJobsData };
    },
    onSuccess: () => {
      toast.success("Job deleted successfully.");
    },
    onError: (error, _variables, context) => {
      toast.error(`Failed to delete job: ${error.message}`);
      if (context?.previousJobsData) {
        context.previousJobsData.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: jobsQueryKeys.all });
    },
  });
};