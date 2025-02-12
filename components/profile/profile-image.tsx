import { ChangeEvent, useState } from "react";
import { UserRoundPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { handleImageUploadErrors } from "@/lib/edge-store-helpers";
import axios, { AxiosResponse } from "axios";

export const ProfileImage = () => {
  const [url, setUrl] = useState<string>("https://github.com/shadcn.png");
  const [tempUrl, setTempUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const { edgestore } = useEdgeStore();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files?.[0];
      handleImageUpload(file);
    } else {
      toast.error("No file selected");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      if (file) {
        const response = await edgestore.publicPhotos.upload({
          file,
          options: {
            replaceTargetUrl: url,
            temporary: true,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });

        setProgress(0);
        setTempUrl(response.url);
      }
    } catch (error: unknown) {
      setProgress(0);
      handleImageUploadErrors(error);
    }
  };

  const handleConfirmUpload = async () => {
    setProgress(101);

    toast.promise(
      axios
        .put(
          "/api/profile/update-avatar",
          { url: tempUrl },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          if (!response.data) {
            throw new Error("No response data received");
          }
          return response;
        }),
      {
        loading: "Uploading...",
        success: async (data: AxiosResponse<any>) => {
          const confirmURL = tempUrl;
          setUrl(tempUrl);
          setTempUrl("");
          setProgress(0);
          await edgestore.publicFiles.confirmUpload({
            url: confirmURL,
          });
          return data.data.message || "Profile image updated";
        },

        error: (err: any) => {
          setProgress(0);
          return (
            err.response?.data?.error ||
            err.message ||
            "Error updating profile image"
          );
        },
      }
    );
  };

  return (
    <div className="relative">
      <Avatar className="cursor-pointer h-16 w-16">
        <AvatarImage
          src={url || ""}
          alt="Profile Image"
          className="object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Edit Icon */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute -top-5 -right-5 h-8 w-8 rounded-full flex justify-center items-center bg-black">
            <UserRoundPen className="h-5 w-5 text-white cursor-pointer" />
          </div>
        </DialogTrigger>

        {/* Modal */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Image</DialogTitle>
            <DialogDescription>
              Upload a new profile image to update.
            </DialogDescription>
          </DialogHeader>

          {/* Image Preview & Upload */}
          <div className="flex flex-col items-center gap-4">
            {/* Live Image Preview */}
            <Avatar className="h-20 w-20 border">
              <AvatarImage
                className={`${
                  progress > 0 ? "animate-pulse" : ""
                } object-cover`}
                src={tempUrl || url}
                alt="New Profile Preview"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* File Input */}
            <Label htmlFor="profileImage" className="text-sm font-medium">
              {progress > 0 && progress != 101
                ? `Uploading ${progress}%`
                : "Upload Image"}
            </Label>
            <Input
              id="profileImage"
              type="file"
              onChange={onChange}
              accept="image/png, image/jpeg"
              className="cursor-pointer"
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirmUpload}
              disabled={progress > 0 || !tempUrl}
            >
              {progress === 101 ? "Wait a moment" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
