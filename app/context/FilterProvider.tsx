"use client";
import { OrganizedBy, queryType } from "@/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface FilterContextType {
  filter: queryType;
  setFilter: Dispatch<SetStateAction<queryType>>;
  department: OrganizedBy;
  setDeparment: Dispatch<SetStateAction<OrganizedBy>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export const FilterContext = createContext<FilterContextType | null>(null);
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<queryType>(queryType.all);
  const [department, setDeparment] = useState<OrganizedBy>(OrganizedBy.All);
  const [page, setPage] = useState<number>(1);
  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        department,
        setDeparment,
        page,
        setPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
