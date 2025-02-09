// "use client";

// import { Button } from "@/components/ui/button";
// import { useEdgeStore } from "@/lib/edgestore";
// import * as React from "react";
// import { toast } from "sonner";
// import {
//   EdgeStoreApiClientError,
//   UploadAbortedError,
// } from "@edgestore/react/errors";

// export default function Page() {
//   const [file, setFile] = React.useState<File>();
//   const { edgestore } = useEdgeStore();
//   const [url, setUrl] = React.useState<string>();
//   const [progress, setProgress] = React.useState<number>(0);
//   const [oldUrl, setOldUrl] = React.useState<string>("");
//   const [abortController, setAbortController] =
//     React.useState<AbortController>();

//   const abortControllerSignal = new AbortController();
//   React.useEffect(() => {
//     setAbortController(abortControllerSignal);
//   }, []);

//   return (
//     <div>
//       <input
//         accept="image/*"
//         type="file"
//         onChange={(e) => {
//           setFile(e.target.files?.[0]);
//         }}
//       />
//       <Button
//         disabled={!file || !!url}
//         onClick={async () => {
//           try {
//             if (file) {
//               const res = await edgestore.publicPhotos.upload({
//                 file,
//                 options: {
//                   replaceTargetUrl: oldUrl,
//                 },
//                 signal: abortController?.signal,
//                 onProgressChange: (progress) => {
//                   setProgress(progress);
//                 },
//               });
//               toast.message(res.thumbnailUrl);
//               setUrl(res.url);
//               setOldUrl(res.url);

//               toast.success("File uploaded", {
//                 description: `File uploaded successfully to ${res}`,
//               });
//             }
//           } catch (error: unknown) {
//             if (error instanceof UploadAbortedError) {
//               return toast.error("Upload aborted", {
//                 description: `${error}`,
//               });
//             } else if (error instanceof EdgeStoreApiClientError) {

//               if (error.data.code === "FILE_TOO_LARGE") {
//                 return toast.error(`File too large. Max size is }`);
//               }

//               if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
//                 toast.error(
//                   `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
//                     ", "
//                   )}`
//                 );
//               }
//             } else {
//               return toast.error("Error", {
//                 description: `${error}`,
//               });
//             }
//           }
//         }}
//       >
//         Upload
//       </Button>
//       {progress > 0 && progress < 100 && (
//         <Button
//           onClick={() => {
//             abortController?.abort();
//             setAbortController(abortControllerSignal);
//           }}
//         >
//           Cancel
//         </Button>
//       )}
//       {url && <p>{url}</p>}
//       {url && <img src={url} className="aspect-square object-cover" />}
//       <Button
//         onClick={async () => {
//           try {
//             if (file) {
//               let res = await edgestore.publicFiles.upload({
//                 file,
//                 options: {
//                   temporary: true,
//                 },
//               });
//               setUrl(res.url);
//             }
//           } catch (error) {
//             toast.error("Error", {
//               description: `${error}`,
//             });
//           }
//         }}
//       >
//         Add Temp
//       </Button>
//       <Button
//         onClick={async () => {
//           if (url) {
//             let res = await edgestore.publicFiles.confirmUpload({
//               url: url,
//             });
//             toast.success("File confirmed", {
//               description: `File confirmed successfully to ${res}`,
//             });
//           }
//         }}
//       >
//         Confirm
//       </Button>
//       <Button
//         onClick={async () => {
//           const res = await edgestore.publicPhotos.delete({
//             url: 'https://files.edgestore.dev/5lhgv52qr0ed2eqa/publicPhotos/_public/1d1bde37-5f4e-4038-a1ca-37537acd37de.jpg',
//           });
//           toast.message(`Message ${res}`);
//         }}
//       >
//         Delete
//       </Button>
//       <div className="h-6 w-96 rounded-md overflow-hidden border border-black mt-10">
//         <div
//           className="bg-black h-full transition-all duration-200 ease-in"
//           style={{
//             width: `${progress}%`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// }
