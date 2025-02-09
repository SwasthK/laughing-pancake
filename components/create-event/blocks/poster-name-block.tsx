"use client";

import { Input } from "@/components/ui/input";
import { FormHeader, Label } from "./form-components";
import { FormField } from "@/components/ui/form";
import { X } from "lucide-react";
import { CreateCoverUploadBlock } from "./cover-upload";

export const CreatePosterNameAndCoverBlock = ({ form }: { form: any }) => {
  return (
    <div className="p-10 bg-[#DADADA]  flex flex-col gap-8 sm:gap-4 w-full  col-span-9  md:col-span-5 ">
      <FormHeader label="Name" split="& Cover"></FormHeader>
      <div className="flex flex-col gap-8 xl:flex-row items-center w-full">
        <div className="grid w-full items-center gap-2.5 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <Label
                  htmlFor="title"
                  label="Event Name"
                  error={form.formState.errors?.title?.message}
                />
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your event title"
                  className=""
                />
              </>
            )}
          />
        </div>
        <div className="grid w-full items-center gap-2.5 bg-[#DADADA] rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <>
                {field.value && (
                  <X
                    onClick={() => {
                      field.onChange(null);
                      form.setError("picture", { message: "Image required" });
                    }}
                    size={20}
                    className="top-0 cursor-pointer right-1 absolute"
                  ></X>
                )}
                <Label
                  htmlFor="picture"
                  label="Cover Image"
                  error={form.formState.errors?.picture?.message}
                  className="w-fit pointer-events-none"
                ></Label>
                <CreateCoverUploadBlock field={field} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
