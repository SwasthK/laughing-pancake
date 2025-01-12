"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setError(urlParams.get("error"));
    }
  }, []);

  return <div>{error ? `Error: ${error}` : "No error"}</div>;
}
