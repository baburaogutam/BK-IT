import { db } from "../helpers/postgresqlDatabaseDb";
import { schema, OutputType } from "./contact_POST.schema";
import superjson from 'superjson';
import { ZodError } from "zod";

export async function handle(request: Request): Promise<Response> {
  try {
    if (request.method !== 'POST') {
      return new Response(superjson.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const json = superjson.parse(await request.text());
    const validatedInput = schema.parse(json);

    await db
      .insertInto('contactInquiries')
      .values({
        ...validatedInput,
        phone: validatedInput.phone || null,
        company: validatedInput.company || null,
        serviceInterest: validatedInput.serviceInterest || null,
        message: validatedInput.message || null,
      })
      .execute();

    const response: OutputType = { success: true, message: "Your inquiry has been submitted successfully." };
    return new Response(superjson.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation error in contact form submission:", error.errors);
      return new Response(superjson.stringify({ error: "Invalid input.", details: error.flatten() }), { status: 400 });
    }
    
    if (error instanceof Error) {
      console.error("Error processing contact form submission:", error);
      return new Response(superjson.stringify({ error: "An unexpected error occurred." }), { status: 500 });
    }

    console.error("Unknown error processing contact form submission:", error);
    return new Response(superjson.stringify({ error: "An unknown error occurred." }), { status: 500 });
  }
}