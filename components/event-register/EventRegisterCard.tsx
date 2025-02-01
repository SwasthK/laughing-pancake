import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CircleCheckBig, User, Users } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { People } from "./People";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Underdog } from "next/font/google";
import { toast } from "sonner";
export default function EventRegisterCard({
  eventId,
  teamId,
  title,
  caption,
  participants,
  teamSize,
  useremail,
  programSlug,
  userExist,
}: {
  eventId: string;
  teamId: string;
  title: string;
  caption: string;
  participants: { name: string | null; email: string }[];
  teamSize: number;
  useremail: string | null | undefined;
  programSlug: string | string[] | undefined;
  userExist: boolean;
}) {
  const register = async () => {
    try {
      const response = await fetch(`/api/form/${programSlug}/register`, {
        method: "POST",
        body: JSON.stringify({
          eventId,
          teamId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const data = await response.json();
      console.log("Registration successful:", data);
      toast.success("registration success");
    } catch (error) {
      toast.error("Failed to register");
      console.error("There was a problem with the registration:", error);
    }
  };
  const unregister = async () => {
    try {
      const response = await fetch(`/api/form/${programSlug}/revoke`, {
        method: "POST",
        body: JSON.stringify({
          eventId,
          teamId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Unregisterd successful:", data);
      toast.success("Unregistraion success");
    } catch (error) {
      toast.error("Failed to unregistraion");
      console.error("There was a problem with the unregistraion:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex  items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{caption}</CardDescription>
          </div>
          <div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {teamSize > 1 ? `${teamSize} People` : `${teamSize} Person`}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="">
          <HoverCard openDelay={300} closeDelay={200}>
            <HoverCardTrigger asChild>
              <Button variant="outline">
                <CircleCheckBig />
                <div>Filled</div>
              </Button>
            </HoverCardTrigger>

            <HoverCardContent className="w-56">
              {participants.map((user, idx) => (
                <People
                  key={idx}
                  name={user.name || "default"}
                  email={user.email}
                />
              ))}
            </HoverCardContent>
          </HoverCard>
          {/* ************************ */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="w-4 h-4" />
                {userExist ? "Unregister" : "Register"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register for Coding Competition</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      You will be registered as:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {useremail}
                    </span>
                  </div>
                </div>
                {userExist ? (
                  <Button
                    className="w-full"
                    onClick={async () => await unregister()}
                  >
                    Cofirm Unregistration
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={async () => await register()}
                  >
                    Confirm Registration
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
          {/* ************************ */}
        </div>
      </CardContent>
    </Card>
  );
}
