"use client";
import { signIn } from "next-auth/webauthn";
import { useSearchParams } from "next/navigation";
import { googleLogin } from "../action";
import { useSession } from "next-auth/react";

export default function Page() {
  const searchParams = useSearchParams();
  async function passKeyLogin() {
    try {
      const data = await signIn("passkey", {
        action: "register",
        email: "axioznot05@gmail.com",
      });
      console.log("data", data);
    } catch (err) {
      console.log("err", err);
    }
  }

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
      <div>
        <button onClick={() => passKeyLogin()}>Register new Passkey</button>

        <button
          onClick={() => signIn("passkey", { email: "axioznot05@gmail.com" })}
        >
          Sign in with Passkey
        </button>
      </div>
    </div>
  );
}
