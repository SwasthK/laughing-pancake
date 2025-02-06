import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { FormField } from "../../ui/form";
import {
  EllipsisVertical,
  Info,
  Loader,
  PencilIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { Editor } from "../../editor/editor";
import { ComboBox } from "../../shadcn/Combobox";
import { FormHeaderProps, FormLabelProps, FormType } from "@/types";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { eventsSchema } from "@/zod";
import { useDebouncedCallback } from "use-debounce";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
                  error={form.formState.errors?.registration?.end?.message}
                  htmlFor="end"
                  label="End date ( Optional )"
                />
                <Input
                  defaultValue={form.getValues("date")}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      end: e.target.value,
                    })
                  }
                  min="2024-01-01"
                  max={form.getValues("date")}
                  type="date"
                  className=""
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="registration"
            render={() => (
              <div className="flex flex-col w-full gap-2.5">
                <Label
                  error={
                    form.formState.errors?.registration?.individual?.message ||
                    form.formState.errors?.registration?.message
                  }
                  htmlFor="individual"
                  label="Allow individual registration ? ( Optional )"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={form.getValues("registration").individual}
                    onCheckedChange={(checked) =>
                      form.setValue("registration", {
                        ...form.getValues("registration"),
                        individual: checked,
                      })
                    }
                  />
                  <label className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Participants can register without a team
                  </label>
                </div>
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
                  label="Add venue location"
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
                  label="Add brochure or poster link"
                />
                <Input
                  {...field}
                  type="text"
                  placeholder="Attach drive or external link"
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

export const CreateEventFormPreferencesBlock = ({ form }: { form: any }) => {
  const handleSelect = (value: string) => {
    form.setValue("formType", value);
    form.trigger("formType");
  };

  return (
    <div className=" gap-5 col-span-9">
      <div className="xl:col-span-6 col-span-10 lg:col-span-5 flex flex-col gap-4 p-10 bg-[#DADADA] relative">
        <FormHeader label="Choose" split="your form"></FormHeader>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select form type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="NONE">None</SelectItem>
              <SelectItem value="INTERNAL">Internal</SelectItem>
              <SelectItem value="EXTERNAL">External</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="absolute top-2 right-2">
          <Dialog>
            <DialogTrigger asChild className="p-0 m-0 w-full ">
              <div className=" flex gap-2 text-sm  items-center cursor-pointer hover:bg-[#DADADA] px-4 py-2 rounded-md">
                <Info className="h-[.9rem] w-[.9rem]" />
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Form types</DialogTitle>
                <DialogDescription>
                  <ol className="mt-1 text-black">
                    <li className="font-semibold ">None</li> - no registration
                    required (anyone can attend)
                    <li className="font-semibold">Internal</li> - Use Built - in
                    form (recommended)
                    <li className="font-semibold">External</li> - Use External
                    forms & embed the link (eg. google form)
                  </ol>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {form.getValues("formType") === FormType.EXTERNAL && (
          <Input
            type="text"
            defaultValue={form.getValues("link")}
            placeholder="Add a registration link"
            className="max-w-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setValue("link", e.target.value)
            }
          />
        )}
        {form.getValues("formType") === FormType.NONE && (
          <Label htmlFor="none" label="Anybody can attend the event" />
        )}
        {form.getValues("formType") === FormType.INTERNAL && (
          <CreateIndividualEventsBlock form={form} />
        )}
      </div>
    </div>
  );
};

type newEventType = {
  name: string;
  caption: string;
  head: { name: string; roll: string }[];
  participants: null | number;
};

export const CreateIndividualEventsBlock = ({ form }: { form: any }) => {
  const [newEvent, setNewEvent] = useState<newEventType>({
    name: "",
    caption: "",
    head: [],
    participants: null,
  });
  const [ermsg, setErmsg] = useState<string>("");
  const [head, setHead] = useState<{ name: string; roll: string }[]>([]);
  const [filteredHeads, setFilteredHeads] = useState<any[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  // const [headsData, setHeadsData] =
  useState<{ name: string; roll: number }[]>();
  const isErrors = (): boolean => {
    const response = eventsSchema.safeParse({ ...newEvent, head: head });
    if (!response.success) {
      setErmsg(response.error.errors[0].message);
      return true;
    }
    return false;
  };

  const handleAddEvent = () => {
    if (isErrors()) {
      return;
    }
    form.setValue("events", [
      ...(form.getValues("events") || []),
      { ...newEvent, head: head },
    ]);

    setErmsg("");
    toast.message(`Event ${newEvent.name} added successfully`);
    setNewEvent({ name: "", caption: "", head: [], participants: null });
    setHead([]);
  };

  const handleRemoveEvent = (index: number) => {
    toast.message(`Event removed successfully`);
    form.setValue(
      "events",
      form.getValues("events").filter((_: any, i: number) => i !== index)
    );
    form.trigger("events");
  };

  const handleEditEvent = (index: number, updatedEvent: newEventType) => {
    if (isErrors()) {
      toast.error(`Validation failed: ${ermsg}`);
      setNewEvent({ name: "", caption: "", head: [], participants: null });
      return;
    }

    const updatedEvents = form
      .getValues("events")
      .map((event: newEventType, i: number) =>
        i === index ? updatedEvent : event
      );

    form.setValue("events", updatedEvents);

    setNewEvent({ name: "", caption: "", head: [], participants: null });
    setErmsg("");
    setHead([]);
    toast.success("Event updated successfully", {
      description: (
        <>
          <code>
            <pre>{JSON.stringify(updatedEvent, null, 2)}</pre>
          </code>
        </>
      ),
    });
  };

  // useEffect(() => {
  //   const fetchHeads = async () => {
  //     try {
  //       const response = await fetch("/api/get-user");
  //       const data = await response.json();
  //       console.log(data);
  //       setHeadsData(data.data);
  //     } catch (error) {
  //       toast.error("Failed to fetch data");
  //     }
  //   };
  //   fetchHeads();
  // }, []);

  const headsData = [
    { roll: 220931, name: "Shainil" },
    { roll: 220981, name: "Swasthik" },
    { roll: 220982, name: "Carol" },
    { roll: 220983, name: "Dave" },
    { roll: 220984, name: "Eve" },
    { roll: 220985, name: "Frank" },
    { roll: 220988, name: "Grace" },
    { roll: 220989, name: "Hank" },
    { roll: 220990, name: "Ivy" },
  ];

  const handleValueChange = useDebouncedCallback(async (e: string) => {
    try {
      if (e.length < 4 || e === "") {
        return;
      }
      setLoad(true);

      // API CALL -------------------->

      // const response = await axios.get("/api/heads", {
      //   params: { query: e },
      // });
      // if (response.data.length > 0) {
      //    setFilteredHeads(response.data);
      // } else {
      //   setFilteredHeads([]);
      // }

      setTimeout(() => {
        const data = headsData?.some((head) => head.roll.toString().includes(e))
          ? headsData.filter((head) => head.roll.toString().includes(e))
          : [];
        setFilteredHeads(data);
        setLoad(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setFilteredHeads([]);
      toast.error("Failed to fetch data");
      setLoad(false);
    }
  }, 800);

  return (
    <div className="grid grid-cols-10 gap-5 col-span-9 ">
      <div className="xl:col-span-6 col-span-10 lg:col-span-5 flex flex-col gap-4 p-10 ">
        <FormHeader label="Add" split="Events"></FormHeader>
        <div className="flex flex-col gap-4  max-w-sm">
          <div className="flex flex-col gap-2.5">
            <Label error={ermsg} htmlFor="events" label="Events" />
            <Input
              value={newEvent.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              type="text"
              placeholder="Add event name"
              className="text-sm"
            />
            <Input
              value={newEvent.caption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewEvent({ ...newEvent, caption: e.target.value })
              }
              type="text"
              placeholder="Add event caption"
              className="text-sm"
            />
            <EditEventheads
              filteredHeads={filteredHeads}
              handleValueChange={handleValueChange}
              load={load}
              setHead={setHead}
              head={head}
            />
            {head.length > 0 && (
              <div className="w-full px-2 text-sm flex flex-wrap gap-4">
                {head.map((key: { roll: string; name: string }, i: number) => (
                  <p key={i} className="bg-[#E6E4E4] px-2 py-1 rounded-md">
                    {key.roll} - {key.name}
                  </p>
                ))}
              </div>
            )}
            <Input
              value={
                !newEvent.participants?.toString() ? "" : newEvent.participants
              }
              maxLength={2}
              minLength={2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value: string = e.target.value;
                if (/^\d*$/.test(value)) {
                  setNewEvent({
                    ...newEvent,
                    participants: value === "" ? 0 : Number(value),
                  });
                }
              }}
              type="text"
              placeholder="Add event participants"
              className="text-sm"
            />
          </div>
          <Button
            type="button"
            onClick={handleAddEvent}
            className="btn btn-primary"
          >
            Add Event
          </Button>
        </div>
      </div>

      <div className="xl:col-span-4 lg:col-span-5 col-span-10 bg-[#E6E4E4]">
        {form.getValues("events").length > 0 ? (
          <ScrollArea className="h-[30rem] w-full rounded-md border p-8">
            {form.getValues("events").map((event: any, index: number) => (
              <div key={index} className="px-1 py-3">
                <div className="bg-[#DADADA] border cursor-pointer rounded-md p-4 flex flex-col relative">
                  <h3 className="font-mono font-semibold text-xl">
                    #{index + 1} {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 ml-2">{event.caption}</p>
                  <p className="font-mono text-sm mt-2">
                    Participants - {event.participants}
                  </p>
                  <div className="mt-3">
                    <p className="font-semibold text-sm">Coordinators:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {event.head.map((key: any, idx: number) => (
                        <li key={idx}>{key.name}</li>
                      ))}
                    </ul>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical className="h-6 w-6 cursor-pointer absolute bottom-4 right-4  hover:bg-[#DADADA] transition-colors duration-300 ease-in p-1 rounded-full bg" />
                    </PopoverTrigger>
                    <PopoverContent className="m-4 w-fit flex flex-col gap-2 p-2">
                      <Dialog>
                        <DialogTrigger
                          asChild
                          className="p-0 m-0 w-full"
                          onClick={() => {
                            setNewEvent(event);
                          }}
                        >
                          <div className=" flex gap-2 text-sm  items-center cursor-pointer hover:bg-[#DADADA] px-4 py-2 rounded-md">
                            <PencilIcon className="h-[.9rem] w-[.9rem]" />
                            <p>Edit</p>
                          </div>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit {event.name}</DialogTitle>
                            <DialogDescription>
                              Make changes to your event here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="eventname"
                                label="Name"
                                className="text-center"
                              ></Label>
                              <Input
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setNewEvent({
                                    ...newEvent,
                                    name: e.target.value,
                                  })
                                }
                                defaultValue={event.name}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="eventcaption"
                                label="Caption"
                                className="text-center"
                              ></Label>
                              <Input
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setNewEvent({
                                    ...newEvent,
                                    caption: e.target.value,
                                  })
                                }
                                defaultValue={event.caption}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="eventchead"
                                label="Head"
                                className="text-center"
                              ></Label>
                              <EditEventheads
                                filteredHeads={filteredHeads}
                                handleValueChange={handleValueChange}
                                load={load}
                                setHead={setHead}
                                head={head}
                                defaultValue={event.head}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="eventparticipants"
                                label="Participants"
                                className="text-center"
                              ></Label>
                              <Input
                                defaultValue={event.participants}
                                maxLength={2}
                                minLength={2}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const value: string = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setNewEvent({
                                      ...newEvent,
                                      participants:
                                        value === "" ? 0 : Number(value),
                                    });
                                  }
                                }}
                                type="text"
                                placeholder="Add event participants"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose>
                              <Button
                                onClick={() =>
                                  handleEditEvent(index, {
                                    ...newEvent,
                                    head: head,
                                  })
                                }
                              >
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger className="flex gap-2 text-sm items-center cursor-pointer hover:bg-[#DADADA] px-4 py-2 rounded-md">
                          <Trash2Icon className="h-[.9rem] w-[.9rem]" />
                          <p>Remove</p>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will remove the
                              selected event .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveEvent(index)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="h-full w-full flex justify-center items-center py-8">
            <p className="font-mono text-sm">No events added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const EditEventheads = ({
  head,
  setHead,
  filteredHeads,
  load,
  handleValueChange,
  defaultValue,
}: {
  head: { name: string; roll: string }[];
  setHead: React.Dispatch<React.SetStateAction<any>>;
  filteredHeads: any;
  load: boolean;
  handleValueChange: any;
  defaultValue?: newEventType;
}) => {
  useEffect(() => {
    setHead(defaultValue || []);
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          Assign heads
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search roll number..."
            onValueChange={handleValueChange}
          />
          <CommandList>
            {load ? (
              <p className="flex w-full justify-center items-center gap-3 py-2 text-sm">
                <Loader className="w-4 h-4 animate-spin"></Loader>
                loading
              </p>
            ) : (
              <CommandEmpty>No heads found.</CommandEmpty>
            )}
            <CommandGroup>
              {filteredHeads?.map((key: any) => (
                <CommandItem
                  key={key.roll}
                  value={key.roll.toString()}
                  onSelect={(currentValue) => {
                    setHead((prevHead: { name: string; roll: number }[]) => {
                      const exists = prevHead?.some(
                        (e: { name: string; roll: number }) =>
                          e.roll === Number(currentValue)
                      );
                      if (exists) {
                        toast.message(`${key.name} removed as a head `);
                        return prevHead.filter(
                          (e: { name: string; roll: number }) =>
                            e.roll != Number(currentValue)
                        );
                      } else {
                        if (head?.length >= 2) {
                          toast.error("Max 2 heads reached");
                          return prevHead;
                        } else {
                          return [
                            ...prevHead,
                            {
                              roll: Number(currentValue),
                              name: key.name,
                            },
                          ];
                        }
                      }
                    });
                  }}
                >
                  {key.roll} - {key.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      head.some((e: any) => e.name === key.name)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
