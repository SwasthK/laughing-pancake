"use client";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { ApiError, ApiResponse } from "@/lib/response";
import { useEffect, useRef } from "react";

export default function RegisterButton({
  link,
  programSlug,
}: {
  link: string;
  programSlug: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoRegister = searchParams.get("autoregister");
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoRegister === "true" && registerButtonRef.current) {
      registerButtonRef.current.click();
    }
  }, [autoRegister]); // Only re-run if autoRegister changes

  async function createTeam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const teamName = (e.target as HTMLFormElement).teamName.value;
    try {
      const res = await axios.post<ApiResponse<{ teamKey: string }>>(
        `/api/team/create`,
        {
          programSlug,
          teamName,
        }
      );
      if (res.data.success) {
        toast.success("Team created successfully");
        const url = new URL(link);
        url.searchParams.set("teamKey", res.data.data.teamKey);
        router.push(url.toString());
      } else {
        toast.error("team is not created");
      }
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error(err?.response?.data.error);
      } else {
        toast.error("An error occurred");
      }
      console.error(err);
    }
  }

  async function joinTeam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post<ApiResponse<{ teamKey: string }>>(
        `/api/team/exist`,
        {
          teamKey: (e.target as HTMLFormElement).teamKey.value,
        }
      );
      if (!res.data.success) {
        toast.error("Team not found");
        return;
      }
      const url = new URL(link);
      url.searchParams.set("teamKey", res.data.data.teamKey);
      router.push(url.toString());
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error(err?.response?.data.error);
      } else {
        toast.error("An error occurred");
      }
      console.error(err);
    }
  }

  return (
    <>
      {link && !link.includes("/events/form") ? (
        <Button ref={registerButtonRef} variant="outline" asChild>
          <Link href={link}>Register</Link>
        </Button>
      ) : (
        <div className="w-full md:w-fit flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button ref={registerButtonRef} variant="outline">
                Register
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a Team or Create a Team</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="join" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="join">Join Team</TabsTrigger>
                  <TabsTrigger value="create">Create Team</TabsTrigger>
                </TabsList>

                <TabsContent value="join" className="space-y-4">
                  <form className="space-y-4" onSubmit={joinTeam}>
                    <Input
                      placeholder="Enter team key"
                      required
                      name="teamKey"
                    />
                    <Button className="w-full" type="submit">
                      Join Team
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="create" className="space-y-4">
                  <form className="space-y-4" onSubmit={createTeam}>
                    <Input placeholder="Team name" required name="teamName" />
                    <Button className="w-full" type="submit">
                      Create Team
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
