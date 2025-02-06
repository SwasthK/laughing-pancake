"use client";
import { signIn } from "next-auth/webauthn";
import { googleLogin } from "../../action";
import { Button } from "@/components/ui/button";
import { ChevronRight, KeyRound } from "lucide-react";
import Link from "next/link";

export default function Page() {
  async function passKeyLogin() {
    try {
      await signIn("passkey", {});
    } catch (err) {
      console.error("passkey error:", err);
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
    } catch (err) {
      console.log("google error:", err);
    }
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-bgPrimary">
      <div className="flex flex-col items-center gap-8 bg-card p-10 rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold text-primary">Welcome Back</h1>
          <p className="text-muted-foreground">
            Choose your preferred sign in method
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button
            onClick={passKeyLogin}
            className="w-full py-6 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3">
              <KeyRound className="w-5 h-5" />
              <span className="text-lg font-medium">Sign in with Passkey</span>
            </div>
            <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full py-6 rounded-lg border-2 hover:bg-secondary/5 text-foreground group relative overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-lg font-medium">Continue with Google</span>
            </div>
            <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
