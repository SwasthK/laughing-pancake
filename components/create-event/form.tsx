"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  CreateDescriptionBlock,
  CreateEventFormPreferencesBlock,
  CreateFormContactBlock,
  CreateFormDateAndTimeBlock,
  CreateFormVenueBlock,
} from "./blocks/form-components";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createEventFormSchema } from "@/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { defaultValues, normalizedData, onError } from "./form-methods";
import { CreatePosterNameAndCoverBlock } from "./blocks/poster-name-block";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(formdata: z.infer<typeof createEventFormSchema>) {
    setLoading(true);
    await edgestore.publicFiles.confirmUpload({
      url: formdata.picture,
    });

    const data = await normalizedData(formdata);
    if (!data) return;

    // Actual API Call goes here
    try {
      const promise = () =>
        new Promise((resolve, reject) => {
          axios
            .post("/api/poster/create", data)
            .then((data) => {
              console.log(data);
              resolve(data.data.message);
            })
            .catch((error) => {
              console.log();
              reject(error.response.data.error);
            });
        });

      toast.promise(promise(), {
        loading: "Loading...",
        success: (data: any) => {
          return <div className="cursor-pointer">{data}</div>;
        },
        error: (data) => {
          return <div className="cursor-pointer">{data}</div>;
        },
        dismissible: true,
      });
    } catch (error: any) {
      if (error !== undefined && axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex justify-center items-center flex-col gap-4 w-full pt-2 pb-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-9 xl:grid-cols-9 gap-4 ">
            <CreatePosterNameAndCoverBlock form={form} />
            <CreateFormDateAndTimeBlock form={form} />
            <CreateDescriptionBlock form={form}></CreateDescriptionBlock>
            <CreateFormVenueBlock form={form}></CreateFormVenueBlock>
            <CreateFormContactBlock form={form}></CreateFormContactBlock>
            <CreateEventFormPreferencesBlock
              form={form}
            ></CreateEventFormPreferencesBlock>
          </div>
          <div className="flex w-full justify-end py-8 ">
            <Button
              disabled={loading}
              type="submit"
              className="w-40 relative disabled:cursor-not-allowed"
            >
              Publish
              {loading && (
                <Loader className="absolute top-3 left-6 animate-spin"></Loader>
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/* // Preview of Editors Data */}
      {/* <EditorPreview jsonData={sampleData}></EditorPreview> */}
    </div>
  );
}
