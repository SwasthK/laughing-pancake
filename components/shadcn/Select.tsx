import * as React from "react";

import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Select({
  items,
  sortIndex,
  setSortIndex,
}: {
  label: string;
  items: { value: string; label: string }[];
  sortIndex: number;
  setSortIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const defaultValue = items[sortIndex]?.value || "";

  return (
    <SelectComponent
      value={items[sortIndex].value}
      onValueChange={(value) => {
        const index = items.findIndex((item) => item.value === value);
        if (index !== -1) setSortIndex(index);
        else setSortIndex(0);
      }}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  );
}
