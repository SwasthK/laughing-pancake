"use server";

import { signIn, signOut } from "@/auth";

export async function googleLogin() {
  await signIn("google");
}

export async function Logout() {
  await signOut();
}
