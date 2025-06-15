"use client";
import { signIn } from "next-auth/webauthn";
import { Button } from "@/components/ui/button";
import { ChevronRight, KeyRound } from "lucide-react";

export default function Page() {
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
        </div>
      </div>
    </div>
  );
}
