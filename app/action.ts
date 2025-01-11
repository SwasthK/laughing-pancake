"use server";

import { signIn } from "@/auth";

export async function googleLogin() {
  await signIn("google", {
    redirect: true,
    redirectTo: "http://localhost:3000",
  });
}
