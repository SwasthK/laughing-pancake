"use client";

export default function Page() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
      [key: number]: HTMLInputElement;
    };
  }

  const submitForm = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const email = e.target[0].value;
    console.log(email);
    try {
      const response = await fetch("/api/email/send-email", {
        method: "POST",
        body: JSON.stringify({ email }),
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
      <form onSubmit={submitForm} method="get">
        <input type="email" required />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
