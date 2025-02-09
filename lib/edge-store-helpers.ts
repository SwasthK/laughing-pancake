import { EdgeStoreApiClientError, UploadAbortedError } from "@edgestore/react/errors";
import { toast } from "sonner";

export const handleImageUploadErrors = (error: unknown) => {
  if (error instanceof UploadAbortedError) {
    return toast.error("Upload Cancelled", {
      description: `${error}`,
    });
  } else if (error instanceof EdgeStoreApiClientError) {
    console.log("er", error.data);
    if (error.data.code === "FILE_TOO_LARGE") {
      return toast.error(`File too large. Max size is 2 MB`);
    }

    if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
      toast.error(
        `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
          ", "
        )}`
      );
    }
  } else {
    return toast.error("Error", {
      description: `${error}`,
    });
  }
};

export enum ImageUploadStatus {
  IDLE,
  WAITING,
  UPLOADING,
  UPLOADED,
  ERROR,
}