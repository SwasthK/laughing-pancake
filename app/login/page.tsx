"use client";

import { useSearchParams } from "next/navigation";
import { googleLogin } from "../action";
import { useSession } from "next-auth/react";

export default function Page() {
  const searchParams = useSearchParams();
  const { data } = useSession();
  console.log("session:", data);
  const error = searchParams.get("error");
  // const handleAuth = async () => {
  //   const s = await auth();
  //   console.log("sesson", s);
  // };

  // handleAuth();

  return (
    <div>
      {error && <p>{error}</p>}
      <form action={googleLogin}>
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
