// netlify/functions/server.ts
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

// If you want envs locally, use a .env and run `netlify dev`
// Netlify will inject process.env.* in Functions
const app = new Hono()

app.get('/_api/job', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/job_GET.js')
  const res = await endpoint(c.req.raw)
  if (!(res instanceof Response) && res?.constructor?.name !== 'Response') {
    return c.text('Invalid response format. handle should return a Response', 500)
  }
  return res
})

app.get('/_api/jobs', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/jobs_GET.js')
  return endpoint(c.req.raw)
})

app.post('/_api/jobs', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/jobs_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/contact', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/contact_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/auth/logout', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/auth/logout_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/jobs/delete', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/jobs/delete_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/jobs/update', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/jobs/update_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/auth/login_with_password', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/auth/login_with_password_POST.js')
  return endpoint(c.req.raw)
})

app.post('/_api/auth/register_with_password', async (c) => {
  const { handle: endpoint } = await import('../../endpoints/auth/register_with_password_POST.js')
  return endpoint(c.req.raw)
})

// Export the Netlify Function handler (no serve(), no static)
export const handler = handle(app)
