import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useGetJobs, useCreateJob, useDeleteJob, useUpdateJob } from "../helpers/useJobsQueries";
import { Button } from "../components/Button";
import { Plus, Edit, Trash2, AlertTriangle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/Dialog";
import { JobForm } from "../components/JobForm";
import { JobListItemAdmin } from "../components/JobListItemAdmin";
import { Skeleton } from "../components/Skeleton";
import { Input } from "../components/Input";
import { useDebounce } from "../helpers/useDebounce";
import type { Selectable } from "kysely";
import type { Jobs, JobType, ExperienceLevel } from "../helpers/postgresqlDatabaseSchema";
import styles from "./admin-dashboard.module.css";

const JOBS_PER_PAGE = 10;

const AdminDashboardPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Selectable<Jobs> | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filters = useMemo(() => ({
    page,
    limit: JOBS_PER_PAGE,
    search: debouncedSearchTerm,
  }), [page, debouncedSearchTerm]);

  const { data, isFetching, error } = useGetJobs(filters);
  const createJobMutation = useCreateJob();
  const updateJobMutation = useUpdateJob();
  const deleteJobMutation = useDeleteJob();

  const totalPages = data ? Math.ceil(data.totalCount / JOBS_PER_PAGE) : 0;

  const handleDelete = (jobId: number) => {
    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      deleteJobMutation.mutate({ jobId });
    }
  };

  const handleCreateSuccess = () => {
    setCreateModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    setEditingJob(null);
  };

  const renderSkeletons = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className={styles.skeletonItem}>
        <div className={styles.skeletonInfo}>
          <Skeleton style={{ height: '1.25rem', width: '60%' }} />
          <Skeleton style={{ height: '1rem', width: '40%' }} />
        </div>
        <div className={styles.skeletonActions}>
          <Skeleton style={{ height: '2rem', width: '2rem', borderRadius: '9999px' }} />
          <Skeleton style={{ height: '2rem', width: '2rem', borderRadius: '9999px' }} />
        </div>
      </div>
    ))
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | BKIT Solutions</title>
        <meta name="description" content="Manage job postings for BKIT Solutions." />
      </Helmet>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Job Management</h1>
            <p className={styles.subtitle}>Create, edit, and manage all job postings.</p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus size={18} />
            Create New Job
          </Button>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <Input
              type="search"
              placeholder="Search jobs..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <main className={styles.jobListContainer}>
          {error && (
            <div className={styles.errorState}>
              <AlertTriangle size={48} className={styles.errorIcon} />
              <h2>Could Not Load Jobs</h2>
              <p>{error.message}</p>
            </div>
          )}

          <div className={styles.jobList}>
            {isFetching ? renderSkeletons() : (
              data?.jobs.map(job => (
                <JobListItemAdmin
                  key={job.id}
                  job={job}
                  onEdit={() => setEditingJob(job)}
                  onDelete={() => handleDelete(job.id)}
                  isDeleting={deleteJobMutation.isPending && deleteJobMutation.variables?.jobId === job.id}
                />
              ))
            )}
          </div>

          {!isFetching && data?.jobs.length === 0 && (
            <div className={styles.emptyState}>
              <h2>No Jobs Found</h2>
              <p>Get started by creating a new job posting.</p>
            </div>
          )}
        </main>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <Button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              variant="outline"
            >
              Previous
            </Button>
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Job Posting</DialogTitle>
            <DialogDescription>Fill in the details for the new job. The posting will be active by default.</DialogDescription>
          </DialogHeader>
          <JobForm
            mode="create"
            onSubmit={createJobMutation.mutate}
            onSuccess={handleCreateSuccess}
            isSubmitting={createJobMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Job Modal */}
      <Dialog open={!!editingJob} onOpenChange={(isOpen) => !isOpen && setEditingJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Posting</DialogTitle>
            <DialogDescription>Update the details for this job posting.</DialogDescription>
          </DialogHeader>
          {editingJob && (
            <JobForm
              mode="edit"
              job={{
                ...editingJob,
                jobType: editingJob.jobType as JobType,
                experienceLevel: editingJob.experienceLevel as ExperienceLevel,
              }}
              onSubmit={(data) => updateJobMutation.mutate({ ...data, jobId: editingJob.id })}
              onSuccess={handleUpdateSuccess}
              isSubmitting={updateJobMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboardPage;