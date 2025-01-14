import nodemailer from "nodemailer";
import { prisma } from "./prismaCleint";

export function generateToken() {
  return crypto.getRandomValues(new Uint8Array(16)).join("");
}

export async function createEmailList(
  email: string,
  token: string,
  expireTime: Date,
  verified: boolean = false
) {
  try {
    const exist = await prisma.emailList.findFirst({
      where: {
        email: email,
      },
    });

    if (exist) {
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
  } catch (err) {
    console.log("API Error:", err);
    return null;
  }
}

export async function setEmailVerified(email: string) {
  try {
    const data = prisma.emailList.update({
      where: {
        email: email,
      },
      data: {
        verified: true,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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

  try {
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
  } catch (err) {
    console.log("API Error:", err);
    return false;
  }
}

export function validateEmail(email: string): boolean {
  // Regex for validating email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validateCollegeEmail(email: string): boolean {
  return email.endsWith("@sdmcujire.in");
}
