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
export default function EventRegisterCard({
  eventId,
  teamId,
  title,
  caption,
  registered,
  useremail,
}: {
  eventId: string;
  teamId: string;
  title: string;
  caption: string;
  registered: { name: string; email: string }[];
  useremail: string;
}) {
  const register = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          eventId,
          teamId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("There was a problem with the registration:", error);
    }
  };
  const unregister = async () => {
    try {
      const response = await fetch("/api/unregister", {
        method: "POST",
        body: JSON.stringify({
          eventId,
          teamId,
          email: useremail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Unregistration successful:", data);
    } catch (error) {
      console.error("There was a problem with the unregistration:", error);
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
              {registered.length > 1
                ? `${registered.length} People`
                : `${registered.length} Person`}
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
              {registered.map((user, idx) => (
                <People key={idx} name={user.name} email={user.email} />
              ))}
            </HoverCardContent>
          </HoverCard>
          {/* ************************ */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="w-4 h-4" />
                Register
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
                <Button
                  className="w-full"
                  onClick={async () => await register()}
                >
                  Confirm Registration
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* ************************ */}
        </div>
      </CardContent>
    </Card>
  );
}
