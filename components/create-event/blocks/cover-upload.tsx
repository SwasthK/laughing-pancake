import { Link } from "@/components/Link";
import { Input } from "@/components/ui/input";
import {
  handleImageUploadErrors,
  ImageUploadStatus,
} from "@/lib/edge-store-helpers";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Check,
  Eye,
  ImagePlus,
  LoaderIcon,
  Timer,
  Trash2,
  Upload,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { BaseClass } from "./base-class";

export const CreateCoverUploadBlock = ({ field }: { field: any }) => {
  const [url, setUrl] = useState<string>(field?.value || "");
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<ImageUploadStatus>(
    ImageUploadStatus.IDLE
  );

  const abortSignal = new AbortController();
  const [abortController, setAbortController] =
    useState<AbortController>(abortSignal);

  const { edgestore } = useEdgeStore();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setStatus(ImageUploadStatus.WAITING);
      const file = e.target.files?.[0];
      setUrl(URL.createObjectURL(file));
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
          signal: abortController?.signal,
          onProgressChange: (progress) => {
            setStatus(ImageUploadStatus.UPLOADING);
            setProgress(progress);
          },
        });
        setStatus(ImageUploadStatus.IDLE);
        toast.success("File uploaded");
        setProgress(0);
        setUrl(response.url);
        field.onChange({ target: { value: response.url } });
      }
    } catch (error: unknown) {
      setStatus(ImageUploadStatus.IDLE);
      setUrl(field.value);
      setProgress(0);
      handleImageUploadErrors(error);
    }
  };

  const abortUpload = async () => {
    if (abortController) {
      abortController.abort();
      setProgress(0);
      setUrl(field.value);
      setAbortController(abortSignal);
      setStatus(ImageUploadStatus.IDLE);
    }
  };

  const deleteUploadedImage = async () => {
    if (url) {
      setStatus(ImageUploadStatus.WAITING);
      await edgestore.publicPhotos.delete({ url: url });
      toast.success("Image removed successfully");
      field.onChange({ target: { value: "" } });
      setUrl("");
      setProgress(0);
      setStatus(ImageUploadStatus.IDLE);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* No Image State */}

        {status === ImageUploadStatus.IDLE && (
          <>
            {url ? (
              <>
                <BaseClass>
                  <Check className="text-green-600 h-5 w-5 mr-2"></Check>
                  <Link
                    href={`${url}`}
                    target={"_blank"}
                    className="bg-transparent p-0 text-black"
                  >
                    <Eye className="ml-2 h-5 w-5"></Eye>
                  </Link>
                </BaseClass>
                <BaseClass className="bg-transperant py-0 px-0 justify-evenly">
                  <div
                    onClick={deleteUploadedImage}
                    className="flex gap-2 items-center h-full bg-white px-3 cursor-pointer rounded-md"
                  >
                    <Trash2 className="h-5 w-5"></Trash2>
                  </div>
                  <div className="flex gap-2 items-center h-full bg-white  rounded-md">
                    <label
                      htmlFor="picture"
                      className="px-3 cursor-pointer h-full flex items-center"
                    >
                      <ImagePlus className="h-5 w-5" />
                    </label>
                  </div>
                </BaseClass>
              </>
            ) : (
              <>
                <BaseClass>
                  <p className={`font-mono`}>No file</p>
                </BaseClass>

                <label htmlFor="picture" className="cursor-pointer">
                  <BaseClass>
                    <Upload className="h-5 w-5" />
                    <p>Upload</p>
                  </BaseClass>
                </label>
              </>
            )}
          </>
        )}

        {status === ImageUploadStatus.WAITING && (
          <>
            <BaseClass>
              <p className={`font-mono`}>Wait...</p>
            </BaseClass>

            <BaseClass>
              <Timer className="h-5 w-5" />
            </BaseClass>
          </>
        )}

        {/* Loading State  */}
        {status === ImageUploadStatus.UPLOADING && (
          <>
            <BaseClass className=" bg-slate-200 justify-start px-4">
              <LoaderIcon className="h-5 w-5 text-muted-foreground animate-spin" />
              <p
                className={`font-mono text-muted-foreground text-center w-full`}
              >
                {progress}%
              </p>
            </BaseClass>
            <BaseClass
              onClick={abortUpload}
              className="bg-gray-200 cursor-pointer"
            >
              <p>Cancel</p>
            </BaseClass>
          </>
        )}
      </div>

      <Input
        name={"picture"}
        id={"picture"}
        onChange={onChange}
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />
    </>
  );
};
