"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setError(urlParams.get("error"));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      {error === "AccessDenied" ? (
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">
            Access Denied: Please verify your email!
          </p>
          <Link
            href="/email/generate-token"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Go to Verify Email Page
          </Link>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">Error: {error}</p>
        </div>
      ) : (
        <p className="text-xl font-semibold">No errors detected!</p>
      )}

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Home
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
