// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";
// import { UserIcon, Trash2, FileText, Info } from "lucide-react";
// import { Badge } from "../ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import axios from "axios";
// import { ApiError, ApiResponse } from "@/lib/response";
// import { toast } from "sonner";
// import { useState } from "react";

// export default function MyTeamCard({
//   teamName,
//   title,
//   programSlug,
//   teamKey,
//   eventType,
//   imageUrl,
//   organizedBy,
//   mutate,
// }: {
//   teamName: string;
//   title: string;
//   teamKey: string;
//   programSlug: string;
//   eventType: string;
//   imageUrl: string;
//   organizedBy: string;
//   mutate: any;
// }) {
//   const router = useRouter();
//   const [loader, setLoader] = useState(false);

//   const deleteTeam = async (tk: string) => {
//     setLoader(true);
//     try {
//       const response = await axios.post<ApiResponse<any>>("/api/team/delete", {
//         teamKey: tk,
//       });
//       mutate();
//       toast.success(response.data.message);
//     } catch (error) {
//       if (axios.isAxiosError<ApiError>(error) && error.response) {
//         toast.error(error.response.data.error);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//       console.error("There was a problem with the deletion:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <Card className="overflow-hidden bg-white flex flex-col h-full transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-lg">
//       <div className="relative w-full h-48">
//         <Image
//           src={imageUrl}
//           alt={`${teamName} event image`}
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//         <div className="absolute top-3 left-3">
//           <Badge className="bg-white/90 hover:bg-white text-black font-medium px-3 py-1">
//             {eventType}
//           </Badge>
//         </div>
//       </div>

//       <CardHeader className="pb-2 pt-4">
//         <div className="flex justify-between items-start">
//           <CardTitle className="text-xl font-bold leading-tight text-gray-900">
//             {teamName}
//           </CardTitle>
//         </div>
//         <CardDescription className="text-sm mt-1 text-gray-600 line-clamp-2">
//           {title}
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="py-1 flex-grow">
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <UserIcon className="h-4 w-4" />
//           <span className="font-medium">{organizedBy}</span>
//         </div>
//       </CardContent>

//       <CardFooter className="pt-3 flex gap-2 border-t border-gray-100 p-4">
//         <Button
//           variant="default"
//           className="flex-1 bg-black hover:bg-gray-800 text-white"
//           onClick={() =>
//             router.push(`/events/form/${programSlug}?teamKey=${teamKey}`)
//           }
//         >
//           <FileText className="h-4 w-4 mr-2" />
//           Go To Form
//         </Button>

//         <Button
//           variant="outline"
//           className="flex-1 border-gray-300 hover:bg-gray-100 text-black"
//           onClick={() => router.push(`/poster/${programSlug}`)}
//         >
//           <Info className="h-4 w-4 mr-2" />
//           Details
//         </Button>

//         <Dialog>
//           <DialogTrigger asChild>
//             <div className="flex-1 text-white">
//               <Button
//                 className="w-full border-red-300 bg-red-500"
//                 disabled={loader}
//                 variant="outline"
//               >
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete
//               </Button>
//             </div>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
//             <DialogHeader className="p-6 bg-gray-50 border-b">
//               <DialogTitle className="text-xl font-semibold text-gray-900">
//                 Delete Team
//               </DialogTitle>
//               <DialogDescription className="text-gray-600 mt-1">
//                 Are you sure you want to delete the team "{teamName}"? This
//                 action cannot be undone.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="p-4 flex justify-end gap-3">
//               <Button
//                 onClick={() => deleteTeam(teamKey)}
//                 disabled={loader}
//                 className="bg-red-500 hover:bg-gray-800 text-white"
//               >
//                 {loader ? "Deleting..." : "Delete Team"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   );
// }

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
import { UserIcon, Trash2, FileText, Info, Copy, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import axios from "axios";
import { ApiError, ApiResponse } from "@/lib/response";
import { toast } from "sonner";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function MyTeamCard({
  teamName,
  title,
  programSlug,
  teamKey,
  eventType,
  imageUrl,
  organizedBy,
  mutate,
}: {
  teamName: string;
  title: string;
  teamKey: string;
  programSlug: string;
  eventType: string;
  imageUrl: string;
  organizedBy: string;
  mutate: any;
}) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [copied, setCopied] = useState(false);

  const deleteTeam = async (tk: string) => {
    setLoader(true);
    try {
      const response = await axios.post<ApiResponse<any>>("/api/team/delete", {
        teamKey: tk,
      });
      mutate();
      toast.success(response.data.message);
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

  const copyTeamKey = () => {
    navigator.clipboard.writeText(teamKey);
    setCopied(true);
    toast.success("Team key copied to clipboard!");

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="overflow-hidden bg-white flex flex-col h-full transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-lg">
      <div className="relative w-full h-48">
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
        <div className="absolute top-3 right-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={copyTeamKey}
                  size="sm"
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-0 h-8 w-8 p-0 rounded-full"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-700" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy team key to share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          <span className="font-medium">{organizedBy}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex gap-2 border-t border-gray-100 p-4">
        <Button
          variant="default"
          className="flex-1 bg-black hover:bg-gray-800 text-white"
          onClick={() =>
            router.push(`/events/form/${programSlug}?teamKey=${teamKey}`)
          }
        >
          <FileText className="h-4 w-4 mr-2" />
          Go To Form
        </Button>

        <Button
          variant="outline"
          className="flex-1 border-gray-300 hover:bg-gray-100 text-black"
          onClick={() => router.push(`/poster/${programSlug}`)}
        >
          <Info className="h-4 w-4 mr-2" />
          Details
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 text-white">
              <Button
                className="w-full border-red-300 bg-red-500"
                disabled={loader}
                variant="outline"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
            <DialogHeader className="p-6 bg-gray-50 border-b">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Delete Team
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Are you sure you want to delete the team "{teamName}"? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="p-4 flex justify-end gap-3">
              <Button
                onClick={() => deleteTeam(teamKey)}
                disabled={loader}
                className="bg-red-500 hover:bg-gray-800 text-white"
              >
                {loader ? "Deleting..." : "Delete Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
