export async function GET() {
  const uid = crypto.randomUUID();

  return Response.json({ uid })
}