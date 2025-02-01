import { prisma } from "./prismaCleint";

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
