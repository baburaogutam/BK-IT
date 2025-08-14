import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  jobId: z.number().int().positive(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  success: boolean;
  message: string;
};

export const postJobsDelete = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/jobs/delete`, {
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
    throw new Error(errorObject.error || "Failed to delete job");
  }

  return JSON.parse(await result.text());
};