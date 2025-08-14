import { z } from "zod";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/postgresqlDatabaseSchema";
import { JobTypeArrayValues, ExperienceLevelArrayValues } from "../helpers/postgresqlDatabaseSchema";

export const schema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  jobType: z.enum(JobTypeArrayValues).optional(),
  experienceLevel: z.enum(ExperienceLevelArrayValues).optional(),
  location: z.string().optional(),
  search: z.string().optional(),
});

export type InputType = z.infer<typeof schema>;

// export type OutputType = {
//   jobs: Selectable<Jobs>[];
//   totalCount: number;
// };
const outputSchema = z.object({
  jobs:z.array(z.any()),
  totalCount:z.number(),
})
export type OutputType = z.infer<typeof outputSchema>;
export const getJobs = async (
  params: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set("page", String(params.page));
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.jobType) queryParams.set("jobType", params.jobType);
  if (params.experienceLevel) queryParams.set("experienceLevel", params.experienceLevel);
  if (params.location) queryParams.set("location", params.location);
  if (params.search) queryParams.set("search", params.search);

  const result = await fetch(`/_api/jobs?${queryParams.toString()}`, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
        const errorObject = JSON.parse(await result.text()) as any;
    throw new Error(errorObject.error || "Failed to fetch jobs");
  }

  return JSON.parse(await result.text());
};