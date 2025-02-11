"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
    >
      Logout
    </button>
  );
}
