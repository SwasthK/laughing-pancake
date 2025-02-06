import { prisma } from "./prismaCleint";
import { customAlphabet } from "nanoid";

export async function getIdByRollNumber(
  rollNumber: string | number
): Promise<string> {
  const collegeEmail = rollNumber + "@sdmcujire.in";
  try {
    const res = await prisma.user.findFirst({
      where: {
        email: collegeEmail,
      },
      select: {
        id: true,
      },
    });
    return res?.id as string;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export async function getIdByEmail(email: string): Promise<string> {
  try {
    const res = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    return res?.id as string;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export function generateTeamKey(programSlug: string): string {
  const nanoid = customAlphabet(
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    4
  );
  return programSlug + "-" + nanoid();
}

export async function getProgramIdBySlug(params: string): Promise<string> {
  try {
    const res = await prisma.program.findFirst({
      where: {
        programSlug: params,
      },
      select: {
        programId: true,
      },
    });
    return res?.programId as string;
  } catch (error) {
    console.error(error);
    return "";
  }
}
