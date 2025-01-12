"use client";

export default function Page() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const handleClick = async () => {
    try {
      const response = await fetch("/api/email/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data", data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <p>
        Click the link in the email we sent you to verify your email address.
      </p>
      <button onClick={handleClick}>click</button>
    </div>
  );
}
