"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  CreateDescriptionBlock,
  CreateFormContactBlock,
  CreateFormDateAndTimeBlock,
  CreateFormEventBlock,
  CreateFormVenueBlock,
  CreateIndividualEventsBlock,
} from "./blocks/FormComponents";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEventFormSchema } from "@/app/zod";
import { Loader, SearchCheck } from "lucide-react";
import { toast } from "sonner";

const defaultValues: z.infer<typeof createEventFormSchema> = {
  title: "",
  picture: undefined as unknown as File,
  description: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [],
      },
    ],
  },
  time: {
    hour: 0,
    minute: 0,
  },
  date: "",
  venue: "",
  registration: {
    individual: false,
    end: "",
  },
  phone: "",
  eventType: "meetup",
  organizedBy: "ba",
  brochure: "",
  events: [],
};

const onError = (errors: any) => {
  const errorMessages = Object.values(errors)
    .map((error: any) => error.message)
    .join(", ");

  toast.error(`Validation failed: ${errorMessages} .`);
};


export default function CreateEventForm() {

  const form = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: defaultValues,
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof createEventFormSchema>) {
    setLoading(true);
    try {
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
      toast.error(error?.message);
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
            <CreateIndividualEventsBlock
              form={form}
            ></CreateIndividualEventsBlock>
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
      {/* <EditorPreview jsonData={sampleData}></EditorPreview> */}
    </div>
  );
}
