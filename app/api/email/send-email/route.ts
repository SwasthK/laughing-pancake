import { createEmailList, generateToken, sendEmail } from "@/utils/email";

export async function POST(request: Request) {
  const { email } = await request.json();
  const token = generateToken();
  console.log(email, token);
  // insert email and token into database

  try {
    await createEmailList(
      email,
      token,
      new Date(Date.now() + 1000 * 60 * 60 * 24)
    );
  } catch (err) {
    console.log(err);
  }

  //send email
  const res = await sendEmail(email, token);
  console.log(res);
  return Response.json({
    message: "Email sent",
    success: true,
    // data,
  });
}
