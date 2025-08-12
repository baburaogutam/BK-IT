import { db } from "../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./job_GET.schema";
import superjson from "superjson";
import { z } from "zod";
import type { JobType, ExperienceLevel } from "../helpers/postgresqlDatabaseSchema";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = {
      id: url.searchParams.get("id"),
    };

    const input = schema.parse(queryParams);

    const jobFromDb = await db
      .selectFrom("jobs")
      .where("id", "=", input.id)
      .where("isActive", "=", true)
      .selectAll()
      .executeTakeFirst();

    if (!jobFromDb) {
      return new Response(
        superjson.stringify({ error: "Job not found or is not active" }),
        { status: 404 }
      );
    }

    // Cast database string values to proper enum types
    const job = {
      ...jobFromDb,
      jobType: jobFromDb.jobType as JobType,
      experienceLevel: jobFromDb.experienceLevel as ExperienceLevel,
    };

    const response: OutputType = { job };

    return new Response(superjson.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    const errorMessage =
      error instanceof z.ZodError
        ? error.errors.map((e) => e.message).join(", ")
        : error instanceof Error
          ? error.message
          : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}