import { db } from "../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./jobs_POST.schema";
import { getServerUserSession } from "../helpers/getServerUserSession";
import superjson from "superjson";
import type { JobType, ExperienceLevel } from "../helpers/postgresqlDatabaseSchema";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);

    if (user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Admins only" }),
        { status: 403 }
      );
    }

    const json = JSON.parse(await request.text());
    const input = schema.parse(json);

    const [newJobFromDb] = await db
      .insertInto("jobs")
      .values({
        ...input,
        createdBy: user.id,
      })
      .returningAll()
      .execute();

    // Cast database string values to proper enum types
    const newJob = {
      ...newJobFromDb,
      jobType: newJobFromDb.jobType as JobType,
      experienceLevel: newJobFromDb.experienceLevel as ExperienceLevel,
    };

    return new Response(JSON.stringify(newJob satisfies OutputType), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}