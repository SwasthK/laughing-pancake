"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserIcon, FileText, Info } from "lucide-react";
import { Badge } from "../ui/badge";

export default function JoinedTeamCard({
  teamName,
  title,
  programSlug,
  teamKey,
  eventType,
  imageUrl,
  organizedBy,
}: {
  teamName: string;
  title: string;
  teamKey: string;
  programSlug: string;
  eventType: string;
  imageUrl: string;
  organizedBy: string;
}) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden p-2 bg-white flex flex-col h-full transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-lg">
      <div className="relative w-full h-48 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${teamName} event image`}
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
            {teamName}
          </CardTitle>
        </div>
        <CardDescription className="text-sm mt-1 text-gray-600 line-clamp-2">
          {title}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-1 flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <UserIcon className="h-4 w-4" />
          <span className="font-medium">{organizedBy.toLocaleUpperCase()}</span>
        </div>
      </CardContent>

      <CardFooter className="py-4 px-0 sm:px-4  w-full flex justify-between items-center gap-2 border-t border-gray-100">
        <Button
          variant="default"
          className=" bg-black hover:bg-gray-800 text-white w-fit"
          onClick={() =>
            router.push(`/events/form/${programSlug}?teamKey=${teamKey}`)
          }
        >
          <FileText className="h-4 w-4 mr-2" />
          Go To Form
        </Button>

        <Button
          variant="outline"
          className=" w-fit border-gray-300 hover:bg-gray-100 text-black"
          onClick={() => router.push(`/poster/${programSlug}`)}
        >
          <Info className="h-4 w-4 mr-2" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
