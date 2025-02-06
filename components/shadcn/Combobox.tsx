"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// type ComboBoxProps = {
//   header: string;
//   comboBoxItems: { value: string; label: string }[];
//   inverse?: boolean;
//   field?: any;
// };

type ComboBoxProps = {
  header: string;
  comboBoxItems: { value: string; label: string }[];
  inverse?: boolean;
  field?: any;
};

export function ComboBox({
  header,
  comboBoxItems,
  inverse,
  field,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    if (field) {
      field.onChange(value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${
            inverse ? "w-full sm:max-w-60 xl:max-full" : "w-fit"
          }  justify-between lg:rounded-md lg:px-4 lg:py-1.5 lg:h-fit h-10 px-4 py-2`}
        >
          {value ? (
            comboBoxItems
              .find((item: any) => item.value === value)
              ?.value.toLocaleUpperCase()
          ) : (
            <>
              <p className="hidden md:block">{`Select ${header}...`}</p>
              <p className="block md:hidden capitalize">{`${header}`}</p>
            </>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {comboBoxItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
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
}
