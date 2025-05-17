export async function POST(request: Request) {
  const body = await request.json();

  console.log("Body da requisiçao: ", body);
}
