import nodemailer from "nodemailer";
import prisma from "./prismaCleint";
export function generateToken() {
  return crypto.getRandomValues(new Uint8Array(16)).join("");
}

export async function createEmailList(
  email: string,
  token: string,
  expireTime: Date,
  verified: boolean = false
) {
  const pre = await prisma.emailList.findFirst({
    where: {
      email: email,
    },
  });
  if (pre) {
    const updatedData = await prisma.emailList.update({
      where: {
        email: email,
      },
      data: {
        token: token,
        token_expires: expireTime,
        verified: verified,
      },
    });
    return updatedData;
  }
  const data = prisma.emailList.create({
    data: {
      email: email,
      token: token,
      token_expires: expireTime,
      verified: verified,
    },
  });
  return data;
  // Create email list
}

export async function setEmailVerified(email: string) {
  const data = prisma.emailList.update({
    where: {
      email: email,
    },
    data: {
      verified: true,
    },
  });
  return data;
}
export async function sendEmail(email: string, token: string) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d4c4f82c25f89a",
      pass: "7d140337464fe9",
    },
  });
  const mailOptions = {
    from: "noresponse@gmail.com",
    to: email,
    subject: "Verify your email",
    html: `<a href="${process.env.DOMAIN_URL}/email/verify-email?token=${token}&email=${email}">Click here to verify your email</a>
             copy paste ths url to browser ${process.env.DOMAIN_URL}/verify-email?token=${token}&email=${email}`,
  };
  const res = await transport.sendMail(mailOptions);
  return res;
  // Send email
}

export async function verifyEmail(email: string, token: string) {
  const data = await prisma.emailList.findFirst({
    where: {
      email: email,
      token: token,
    },
  });
  if (!data) {
    return false;
  }
  if (!data.token_expires) {
    return false;
  }

  if (data.token_expires < new Date()) {
    return false;
  }

  await prisma.emailList.update({
    where: {
      email: email,
      token: token,
    },
    data: {
      verified: true,
    },
  });
  return true;
}
