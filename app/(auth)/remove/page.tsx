"use client";
import { signIn } from "next-auth/webauthn";
import { Button } from "@/components/ui/button";
import { ChevronRight, KeyRound, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logout } from "@/app/action";

export default function Page() {
  const { data: session } = useSession();

  async function passKeyRegister() {
    try {
      await signIn("passkey", {
        action: "register",
      });
    } catch (err) {
      console.log("passkey register error:", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-bgPrimary p-4">
      {session && (
        <div className="bg-card p-6 rounded-xl shadow-md mb-6 w-full max-w-md">
          <h2 className="text-lg font-medium mb-2">Current Session</h2>
          <pre className="bg-secondary/10 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}

      <div className="flex flex-col items-center gap-8 bg-card p-10 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center space-y-2 w-full">
          <h1 className="text-2xl font-semibold text-primary">
            Register Passkey
          </h1>
          <p className="text-muted-foreground">
            Securely register your device as a passkey
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button
            onClick={passKeyRegister}
            className="w-full py-6 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3">
              <KeyRound className="w-5 h-5" />
              <span className="text-lg font-medium">Register with Passkey</span>
            </div>
            <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Button>

          {session && (
            <Button onClick={Logout} variant="outline" className="mt-4">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              want to Signin?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
