import { verifyEmail } from "@/utils/email";

export async function POST(request: Request) {
  const { email, token } = await request.json();
  const res = await verifyEmail(email, token);
  if (res) {
    return Response.json({
      message: "Email verified",
      success: true,
    });
  }
  return Response.json({
    message: "Email not verified",
    success: false,
  });
}
