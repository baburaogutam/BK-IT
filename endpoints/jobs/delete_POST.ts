import { db } from "../../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./delete_POST.schema";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import superjson from "superjson";
import { sql } from "kysely";

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
    const { jobId } = schema.parse(json);

    const result = await db
      .deleteFrom("jobs")
      .where("id", "=", jobId)
      .executeTakeFirst();

    if (result.numDeletedRows === 0n) {
      return new Response(
        JSON.stringify({ error: "Job not found or already deleted" }),
        { status: 404 }
      );
    }

    const response: OutputType = { success: true, message: "Job deleted successfully." };
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}