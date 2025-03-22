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
import { queryType } from "@/types";

export function Select({
  items,
  filter,
  setFilter,
}: {
  items: { value: queryType; label: string }[];
  filter: queryType;
  setFilter: React.Dispatch<React.SetStateAction<queryType>>;
}) {
  // const defaultValue = items[sortIndex]?.value || "";

  return (
    <SelectComponent
      value={filter}
      onValueChange={(value: queryType) => {
        setFilter(value);
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
