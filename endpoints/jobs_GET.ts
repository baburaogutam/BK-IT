import { db } from "../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./jobs_GET.schema";
import type { JobType, ExperienceLevel } from "../helpers/postgresqlDatabaseSchema";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const queryParams = {
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
      jobType: url.searchParams.get("jobType") ?? undefined,
      experienceLevel: url.searchParams.get("experienceLevel") ?? undefined,
      location: url.searchParams.get("location") ?? undefined,
      search: url.searchParams.get("search") ?? undefined,
    };

    const input = schema.parse(queryParams);

    const page = input.page ?? 1;
    const limit = input.limit ?? 10;
    const offset = (page - 1) * limit;

    let query = db
      .selectFrom("jobs")
      .where("isActive", "=", true);

    if (input.jobType) {
      query = query.where("jobType", "=", input.jobType);
    }
    if (input.experienceLevel) {
      query = query.where("experienceLevel", "=", input.experienceLevel);
    }
    if (input.location) {
      query = query.where("location", "ilike", `%${input.location}%`);
    }
    if (input.search) {
      const searchTerm = `%${input.search}%`;
      query = query.where((eb) =>
        eb.or([
          eb("title", "ilike", searchTerm),
          eb("company", "ilike", searchTerm),
          eb("description", "ilike", searchTerm),
        ])
      );
    }

    const jobsFromDb = await query
      .selectAll()
      .orderBy("createdAt", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    // Cast database string values to proper enum types
    const jobs = jobsFromDb.map(job => ({
      ...job,
      jobType: job.jobType as JobType,
      experienceLevel: job.experienceLevel as ExperienceLevel,
    }));

    // To get the total count, we need to re-use the same where clauses
    let countQuery = db
      .selectFrom("jobs")
      .select(db.fn.count("id").as("count"))
      .where("isActive", "=", true);

    if (input.jobType) {
      countQuery = countQuery.where("jobType", "=", input.jobType);
    }
    if (input.experienceLevel) {
      countQuery = countQuery.where("experienceLevel", "=", input.experienceLevel);
    }
    if (input.location) {
      countQuery = countQuery.where("location", "ilike", `%${input.location}%`);
    }
    if (input.search) {
      const searchTerm = `%${input.search}%`;
      countQuery = countQuery.where((eb) =>
        eb.or([
          eb("title", "ilike", searchTerm),
          eb("company", "ilike", searchTerm),
          eb("description", "ilike", searchTerm),
        ])
      );
    }

    const { count } = await countQuery.executeTakeFirstOrThrow();

    const response: OutputType = {
      jobs,
      totalCount: Number(count),
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}