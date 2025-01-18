import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { FormField } from "../../ui/form";
import { X } from "lucide-react";
import { Editor } from "../../editor/editor";
import { ComboBox } from "../../shadcn/Combobox";
import { FormHeaderProps, FormLabelProps } from "@/types";
import React from "react";

export const FormHeader = ({ label, split, className }: FormHeaderProps) => {
  return (
    <p className={cn("text-3xl font-semibold", className)}>
      {label} {split && <span className="text-[#666666]">{split}</span>}
    </p>
  );
};

export const Label = ({ label, htmlFor, className, error }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        `${error ? "text-red-500" : "text-muted-foreground"} text-sm`,
        className
      )}
    >
      {error ? error : label}
    </label>
  );
};

export const CreateFormEventBlock = ({ form }: { form: any }) => {
  return (
    <div className="p-10 bg-[#DADADA]  flex flex-col gap-8 sm:gap-4 w-full  col-span-9  md:col-span-5 ">
      <FormHeader label="Create" split="Event"></FormHeader>
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
                  className=""
                />
                <Input
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  accept="image/png, image/jpeg, image/webp"
                  type="file"
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export const CreateFormDateAndTimeBlock = ({ form }: { form: any }) => {
  return (
    <div className="p-10 bg-[#DADADA]  flex flex-col gap-8 sm:gap-4 w-full  col-span-9  md:col-span-4 ">
      <FormHeader label="Time & " split="Date"></FormHeader>

      <div className="flex justify-evenly flex-wrap gap-8 xl:flex-row items-center ">
        <div className="grid w- items-center gap-2.5 rounded-md relative max-w-sm md:w-full xl:w-fit w-fit">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <>
                <Label
                  htmlFor="time"
                  label="Time"
                  error={
                    form.formState.errors?.time?.hour?.message ||
                    form.formState.errors?.time?.minute?.message ||
                    form.formState.errors?.time?.message
                  }
                />

                <div className=" flex  gap-2">
                  <Input
                    maxLength={2}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        hour: parseInt(e.target.value, 10),
                      })
                    }
                    type="text"
                    placeholder="hour"
                    className="text-sm w-14"
                  />
                  <Input
                    maxLength={2}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        minute: parseInt(e.target.value, 10),
                      })
                    }
                    type="text"
                    placeholder="min"
                    className="text-sm w-14"
                  />
                </div>
              </>
            )}
          />
        </div>
        <div className="grid items-center gap-2.5  bg-[#DADADA] rounded-md relative max-w-sm md:w-full xl:w-fit w-fit">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <>
                <Label
                  htmlFor="date"
                  label="Date"
                  error={form.formState.errors?.date?.message}
                />
                <Input
                  min="2025-01-02"
                  {...field}
                  type="date"
                  className="text-sm cursor-pointer"
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export const CreateDescriptionBlock = ({ form }: { form: any }) => {
  return (
    <div className="flex flex-col gap-4 h-[45rem] w-full place-items-start items-start p-10 bg-[#DADADA] rounded-md col-span-9 xl:col-span-6  ">
      <FormHeader label="Event" split="Description"></FormHeader>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <>
            <Label
              error={form.formState.errors?.description?.message}
              htmlFor="description"
              label="Write anything about the event !"
            />
            <Editor
              initialContent={field.value}
              setEditorContent={field.onChange}
            />
          </>
        )}
      />
    </div>
  );
};

// Custom block - to be deleted 
// export const CreateFormVenueBlock = ({ form }: { form: any }) => {
//   const [search, setSearch] = useState("");
//   return (
//     <div className="grid xl:flex xl:flex-col gap-5 col-span-9 xl:col-span-3">
//       <div className="p-10 bg-[#DADADA] flex gap-4 flex-col">
//         <FormHeader label="Organized" split="by"></FormHeader>
//         <div className="grid w-full items-center gap-6 rounded-md relative max-w-sm">
//           <FormField
//             control={form.control}
//             name="registration"
//             render={({ field }) => (
//               <div className="flex flex-col w-full gap-2.5">
//                 <Label
//                   error={
//                     form.formState.errors?.registration?.url?.message ||
//                     form.formState.errors?.registration?.message
//                   }
//                   htmlFor="registration"
//                   label="Registration Link"
//                 />

//                 <div className="flex flex-col gap-3">
//                   <Input
//                     placeholder="Search for frameworks"
//                     type="text"

//                     className="text-sm "
//                     onChange={(e) => setSearch(e.target.value)}
//                   />

//                   {search && (
//                     <div className="bg-white rounded-md py-3 px-3 flex flex-col gap-3 max-h-48 overflow-y-scroll">
//                       {frameworks.filter((framework) =>
//                         framework.label
//                           .toLowerCase()
//                           .includes(search.toLowerCase())
//                       ).length > 0 ? (
//                         frameworks
//                           .filter((framework) =>
//                             framework.label
//                               .toLowerCase()
//                               .includes(search.toLowerCase())
//                           )
//                           .map((framework) => (
//                             <Tooltip content={"ohhhhhhhhhhhhhhhhh"}>
//                               <div
//                                 onClick={() => {
//                                   setSearch("");
//                                   field.onChange({
//                                     ...field.value,
//                                     url: framework.value,
//                                   });
//                                 }}
//                                 className="cursor-pointer text-sm "
//                               >
//                                 <p className="text-sm py-2 px-2 rounded-md hover:bg-[#DADADA] transition-colors duration-200 ease-in">
//                                   {framework.label}
//                                 </p>
//                               </div>
//                             </Tooltip>
//                           ))
//                       ) : (
//                         <p>No result found</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="registration"
//             render={({ field }) => (
//               <div className="flex flex-col w-full gap-2.5">
//                 <Label
//                   error={form.formState.errors?.registration?.end?.message}
//                   htmlFor="end"
//                   label="End date *"
//                 />
//                 <Input
//                   onChange={(e) =>
//                     field.onChange({ ...field.value, end: e.target.value })
//                   }
//                   min="2025-01-02"
//                   type="text"
//                   placeholder=""
//                   disabled
//                   className=""
//                 />
//               </div>
//             )}
//           />
//         </div>
//       </div>

//       <div className="p-10 bg-[#DADADA] flex gap-4 flex-col">
//         <FormHeader label="Registration"></FormHeader>
//         <div className="grid w-full items-center gap-6 rounded-md relative max-w-sm">
//           <FormField
//             control={form.control}
//             name="registration"
//             render={({ field }) => (
//               <div className="flex flex-col w-full gap-2.5">
//                 <Label
//                   error={
//                     form.formState.errors?.registration?.url?.message ||
//                     form.formState.errors?.registration?.message
//                   }
//                   htmlFor="registration"
//                   label="Registration Link"
//                 />
//                 <Input
//                   onChange={(e) =>
//                     field.onChange({ ...field.value, url: e.target.value })
//                   }
//                   type="text"
//                   placeholder="Add link to registration"
//                   className=""
//                 />
//               </div>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="registration"
//             render={({ field }) => (
//               <div className="flex flex-col w-full gap-2.5">
//                 <Label
//                   error={form.formState.errors?.registration?.end?.message}
//                   htmlFor="end"
//                   label="End date *"
//                 />
//                 <Input
//                   onChange={(e) =>
//                     field.onChange({ ...field.value, end: e.target.value })
//                   }
//                   min="2025-01-02"
//                   type="date"
//                   placeholder=""
//                   className=""
//                 />
//               </div>
//             )}
//           />
//         </div>
//       </div>

//       <div className="p-10 bg-[#DADADA] flex gap-4 flex-col">
//         <FormHeader label="Phone"></FormHeader>
//         <div className="grid w-full items-center gap-2.5 rounded-md relative max-w-sm">
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <>
//                 <Label
//                   error={form.formState.errors?.phone?.message}
//                   htmlFor="phone"
//                   label="Phone number"
//                 />
//                 <Input
//                   {...field}
//                   type="tel"
//                   minLength={10}
//                   maxLength={10}
//                   placeholder="Add phone number"
//                   className=""
//                 />
//               </>
//             )}
//           />
//         </div>
//       </div>

//     </div>
//   );
// };

const courses = [
  {
    value: "bca",
    label: "Bachuleor of Computer Application [BCA]",
  },
  {
    value: "bba",
    label: "Bachuleor of Business Administration [BBA]",
  },
  {
    value: "bcom",
    label: "Bachuleor of Commerce [BCom]",
  },
  {
    value: "bsc",
    label: "Bachuleor of Science [BSc]",
  },
  {
    value: "ba",
    label: "Bachuleor of Arts [BA]",
  },
];

const eventTypes = [
  { value: "intercollegiate", label: "Intercollegiate" },
  { value: "interdepartment", label: "Interdepartment" },
  { value: "seminar", label: "Seminar" },
  { value: "workshop", label: "Workshop" },
  { value: "hackathon", label: "Hackathon" },
  { value: "conference", label: "Conference" },
  { value: "meetup", label: "Meetup" },
];

export const CreateFormVenueBlock = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-10 xl:flex xl:flex-col gap-5 col-span-9 xl:col-span-3">
      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col  col-span-10 md:col-span-5">
        <FormHeader label="Organized" split="by"></FormHeader>
        <div className="grid w-full items-center gap-2.5 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="organizedBy"
            render={({ field }) => (
              <>
                <Label
                  error={form.formState.errors?.organizedBy?.message}
                  htmlFor="organizedBy"
                  label="Choose your Department"
                />
                <ComboBox
                  comboBoxItems={courses}
                  header="Select"
                  inverse={true}
                  field={field}
                ></ComboBox>
              </>
            )}
          />
        </div>
      </div>

      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col  col-span-10 md:col-span-5">
        <FormHeader label="Event" split="type"></FormHeader>
        <div className="grid w-full items-center gap-2.5 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <>
                <Label
                  error={form.formState.errors?.eventType?.message}
                  htmlFor="eventType"
                  label="Choose your Event Type"
                />
                <ComboBox
                  comboBoxItems={eventTypes}
                  header="Select"
                  inverse={true}
                  field={field}
                ></ComboBox>
              </>
            )}
          />
        </div>
      </div>

      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col col-span-10">
        <FormHeader label="Registration"></FormHeader>
        <div className="flex flex-col md:flex-col w-full items-center gap-6 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <div className="flex flex-col w-full gap-2.5">
                <Label
                  error={
                    form.formState.errors?.registration?.url?.message ||
                    form.formState.errors?.registration?.message
                  }
                  htmlFor="registration"
                  label="Registration Link"
                />
                <Input
                  onChange={(e) =>
                    field.onChange({ ...field.value, url: e.target.value })
                  }
                  type="text"
                  placeholder="Add link to registration"
                  className=""
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <div className="flex flex-col w-full gap-2.5">
                <Label
                  error={form.formState.errors?.registration?.end?.message}
                  htmlFor="end"
                  label="End date *"
                />
                <Input
                  onChange={(e) =>
                    field.onChange({ ...field.value, end: e.target.value })
                  }
                  min="2025-01-02"
                  type="date"
                  placeholder=""
                  className=""
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export const CreateFormContactBlock = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-9 gap-5 col-span-9">
      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col col-span-9 md:col-span-5 lg:col-span-3">
        <FormHeader label="Venue"></FormHeader>
        <div className="grid w-full items-center gap-6 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <div className="flex flex-col w-full gap-2.5">
                <Label
                  error={
                    form.formState.errors?.venue?.url?.message ||
                    form.formState.errors?.venue?.message
                  }
                  htmlFor="venue"
                  label="venue"
                />
                <Input
                  {...field}
                  type="text"
                  placeholder="Add location"
                  className=""
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col col-span-9 md:col-span-4 lg:col-span-3">
        <FormHeader label="Brochure"></FormHeader>
        <div className="grid w-full items-center gap-2.5 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="brochure"
            render={({ field }) => (
              <>
                <Label
                  error={form.formState.errors?.brochure?.message}
                  htmlFor="brochure"
                  label="Add brochure"
                />
                <Input
                  {...field}
                  type="text"
                  placeholder="Attach drive link"
                  className=""
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="p-10 bg-[#DADADA] flex gap-4 flex-col col-span-9 sm:col-span-9 lg:col-span-3">
        <FormHeader label="Contact"></FormHeader>
        <div className="grid w-full items-center gap-6 rounded-md relative max-w-sm">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <div className="flex flex-col w-full gap-2.5">
                <Label
                  error={form.formState.errors?.phone?.message}
                  htmlFor="phone"
                  label="Phone number"
                />
                <Input
                  {...field}
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  placeholder="Add a contact number"
                  className=""
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

// TODO - Split blocks by reusing duplicate classes

// const formfielditems=[{
//   control:form.control,
//   name:"phone",

// }]

// const FormBlock = ({
//   children,
//   ...props
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className="grid w-full items-center gap-6 rounded-md relative max-w-sm">
//       <FormField
//         control={form.control}
//         name="phone"
//         render={({ field }) => (
//           <div className="flex flex-col w-full gap-2.5">
//             <Label
//               error={form.formState.errors?.phone?.message}
//               htmlFor="phone"
//               label="Phone number"
//             />
//             <Input
//               {...field}
//               type="tel"
//               minLength={10}
//               maxLength={10}
//               placeholder="Add a contact number"
//               className=""
//             />
//           </div>
//         )}
//       />
//     </div>
//   );
// };
