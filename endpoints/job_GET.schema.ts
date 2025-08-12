import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Jobs } from "../helpers/postgresqlDatabaseSchema";

export const schema = z.object({
  id: z.coerce.number().int().positive("A valid Job ID is required."),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  job: Selectable<Jobs>;
};

export const getJob = async (
  params: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const queryParams = new URLSearchParams();
  queryParams.set("id", String(params.id));

  const result = await fetch(`/_api/job?${queryParams.toString()}`, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
    const errorObject = superjson.parse(await result.text()) as any;
    console.log(result)
    throw new Error(errorObject.error || "Failed to fetch job");
  }

  return superjson.parse<OutputType>(await result.text());
};