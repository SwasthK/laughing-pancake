"use client";
import { ApiError, ApiResponse } from "@/lib/response";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, Info, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function MyProgramCard({
  programSlug,
  title,
  date,
  image,
  eventType,
  organizedBy,
  mutate,
}: {
  programSlug: string;
  title: string;
  image: string;
  date: Date;
  eventType: string;
  organizedBy: string;
  mutate: any;
}) {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const deleteProgram = async (pSlug: string) => {
    setLoader(true);
    try {
      const response = await axios.post<ApiResponse<any>>(
        "/api/poster/delete",
        {
          programSlug: pSlug,
        },
      );
      mutate();
      toast.success(response.data.message || "Program deleted successfully");
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("There was a problem with the deletion:", error);
    } finally {
      setLoader(false);
    }
  };

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden bg-white flex flex-col h-full transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-lg">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={`${title} event image`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 hover:bg-white text-black font-medium px-3 py-1">
            {eventType}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold leading-tight text-gray-900">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm mt-1 text-gray-600">
          {formattedDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-1 flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span className="font-medium">Organized by: {organizedBy}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex gap-2 border-t border-gray-100 p-4">
        <Button
          variant="outline"
          className="flex-1 border-gray-300 hover:bg-gray-100 text-black"
          onClick={() => router.push(`/poster/${programSlug}`)}
        >
          <Info className="h-4 w-4 mr-2" />
          View Details
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1">
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                disabled={loader}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
            <DialogHeader className="p-6 bg-gray-50 border-b">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Delete Program
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Are you sure you want to delete the program &quot;{title}&quot;?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="p-4 flex justify-end gap-3">
              <Button
                onClick={() => deleteProgram(programSlug)}
                disabled={loader}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {loader ? "Deleting..." : "Delete Program"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
