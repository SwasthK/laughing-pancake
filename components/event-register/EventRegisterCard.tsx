import React, { useState } from "react";
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
import { toast } from "sonner";
import { FormattedEvent } from "@/types";
import { FetchResponse } from "@/lib/fetcher";
import { KeyedMutator } from "swr";
import axios from "axios";
import { ApiError, ApiResponse } from "@/lib/response";
export default function EventRegisterCard({
  mutate,
  eventId,
  teamKey,
  title,
  caption,
  participants,
  teamSize,
  useremail,
  programSlug,
  userExist,
}: {
  mutate: KeyedMutator<FetchResponse<FormattedEvent[]>>;
  eventId: string;
  teamKey: string;
  title: string;
  caption: string;
  participants: { name: string | null; email: string }[];
  teamSize: number;
  useremail: string | null | undefined;
  programSlug: string | string[] | undefined;
  userExist: boolean;
}) {
  const [loader, setLoader] = useState(false);
  const register = async () => {
    setLoader(true);
    try {
      const response = await axios.post<ApiResponse<any>>(
        `/api/form/${programSlug}/register`,
        {
          eventId,
          teamKey,
        }
      );
      mutate();

      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("There was a problem with the registration:", error);
    } finally {
      setLoader(false);
    }
  };

  const unregister = async () => {
    setLoader(true);
    try {
      const response = await axios.post<ApiResponse<any>>(
        `/api/form/${programSlug}/revoke`,
        {
          eventId,
          teamKey,
        }
      );
      toast.success(response.data.message);
      mutate();
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("There was a problem with the registration:", error);
    } finally {
      setLoader(false);
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
              {teamSize > 1
                ? `${participants.length}/${teamSize} People`
                : `${participants.length}/${teamSize} Person`}
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
                      You will be{" "}
                      {userExist ? "unregisterd as" : "registered as"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {useremail}
                    </span>
                  </div>
                </div>
                {userExist ? (
                  <Button
                    disabled={loader}
                    className="w-full"
                    onClick={unregister}
                  >
                    Cofirm Unregistration
                  </Button>
                ) : (
                  <Button
                    disabled={loader}
                    className="w-full"
                    onClick={register}
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
