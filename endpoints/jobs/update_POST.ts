import { db } from "../../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./update_POST.schema";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import superjson from "superjson";
import { z } from "zod";
import type { JobType, ExperienceLevel } from "../../helpers/postgresqlDatabaseSchema";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);

    if (user.role !== "admin") {
      return new Response(
        superjson.stringify({ error: "Unauthorized: Admins only" }),
        { status: 403 }
      );
    }

    const json = superjson.parse(await request.text());
    const { jobId, ...updateData } = schema.parse(json);

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return new Response(
        superjson.stringify({ error: "No update data provided" }),
        { status: 400 }
      );
    }

    const [updatedJobFromDb] = await db
      .updateTable("jobs")
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where("id", "=", jobId)
      .returningAll()
      .execute();

    if (!updatedJobFromDb) {
      return new Response(
        superjson.stringify({ error: "Job not found" }),
        { status: 404 }
      );
    }

    // Cast database string values to proper enum types
    const updatedJob = {
      ...updatedJobFromDb,
      jobType: updatedJobFromDb.jobType as JobType,
      experienceLevel: updatedJobFromDb.experienceLevel as ExperienceLevel,
    };

    return new Response(superjson.stringify(updatedJob satisfies OutputType), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating job:", error);
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