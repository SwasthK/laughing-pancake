"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  CreateDescriptionBlock,
  CreateEventFormPreferencesBlock,
  CreateFormContactBlock,
  CreateFormDateAndTimeBlock,
  CreateFormEventBlock,
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

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(formdata: z.infer<typeof createEventFormSchema>) {
    console.log("Data", formdata);
    const data = normalizedData(formdata);
    if (!data) return;

    setLoading(true);

    // Actual API Call goes here
    try {
      const res = await fetch("/api/poster/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      console.log(resData);
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(
                <div>
                  <strong>Event Created</strong>
                  <code className="text-sm">
                    <pre className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </code>
                </div>
              ),
            800
          )
        );
      toast.promise(promise(), {
        loading: "Loading...",
        success: (data: any) => {
          return <div className="cursor-pointer">{data}</div>;
        },
        error: "Error",
        dismissible: true,
      });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
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
            <CreateFormEventBlock form={form} />
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
