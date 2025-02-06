"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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

export default function RegisterButton({
  link,
  programSlug,
}: {
  link: string;
  programSlug: string;
}) {
  const router = useRouter();

  async function createTeam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const teamName = (e.target as HTMLFormElement).teamName.value;
    try {
      const res = await fetch(`/api/team/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ programSlug, teamName }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team created successfully");
        const url = new URL(link);
        url.searchParams.set("teamKey", data.data);
        router.push(url.toString());
      } else {
        toast.error("You have already created a team");
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    }
  }

  async function joinTeam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/team/exist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamKey: (e.target as HTMLFormElement).teamKey.value,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error("Team not found");
        return;
      }
      const url = new URL(link);
      url.searchParams.set("teamKey", data.data);
      router.push(url.toString());
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }

  return (
    <>
      {link && !link.includes("/events/form") ? (
        <Button variant="outline" asChild>
          <Link href={link}>Register</Link>
        </Button>
      ) : (
        <div className="w-full md:w-fit flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Register</Button>
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
