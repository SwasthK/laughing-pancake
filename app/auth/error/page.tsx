"use client";

import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { AuthError } from "@/lib/enum";
export default function Page() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const errorMessage = urlParams.get("error");
      if (errorMessage == AuthError.INVALID_COLLEGE_EMAIL) {
        setError("Please Enter Your College Email");
      } else {
        setError(errorMessage);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-300px)]  bg-bgPrimary text-foreground">
      <div className="text-center flex flex-col items-center gap-8">
        <h1 className="text-[7rem] md:text-[20rem] font-extrabold tracking-tight text-primary-dark animate-pulse">
          ERROR
        </h1>
        <p className="text-xl md:text-3xl font-medium text-muted-foreground opacity-80">
          {error}
        </p>
        <div className="flex gap-6">
          <Link
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-semibold shadow-lg hover:bg-primary-foreground hover:text-primary  transform transition duration-300"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-6 py-3 rounded-lg bg-secondary hover:text-secondary  hover:bg-secondary-foreground  text-secondary-foreground text-lg font-semibold shadow-lg transform transition duration-300"
            href="/auth/signin"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
