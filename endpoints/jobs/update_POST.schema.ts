import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Jobs } from "../../helpers/postgresqlDatabaseSchema";
import { schema as createSchema } from "../jobs_POST.schema";

// Update schema makes all fields optional and adds jobId
export const schema = createSchema.partial().extend({
  jobId: z.number().int().positive(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<Jobs>;

export const postJobsUpdate = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/jobs/update`, {
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
    throw new Error(errorObject.error || "Failed to update job");
  }

  return JSON.parse(await result.text());
};