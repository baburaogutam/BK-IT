import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/postgresqlDatabaseSchema";
import { JobTypeArrayValues, ExperienceLevelArrayValues } from "../helpers/postgresqlDatabaseSchema";

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(JobTypeArrayValues),
  experienceLevel: z.enum(ExperienceLevelArrayValues),
  salaryRange: z.string().optional().nullable(),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters long"),
  benefits: z.string().optional().nullable(),
  applicationUrl: z.string().url("Must be a valid URL").optional().nullable(),
  contactEmail: z.string().email("Must be a valid email").optional().or((z.literal(""))),
  isActive: z.boolean().optional().default(true),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<Jobs>;

export const postJobs = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/jobs`, {
    method: "POST",
    body: JSON.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
        const errorObject = JSON.parse(await result.text()) as any;
    throw new Error(errorObject.error || "Failed to create job");
  }

  return JSON.parse(await result.text());
};