import { ComboBox } from "./shadcn/Combobox";
import { Select } from "./shadcn/Select";

const comboBoxItems = [
  {
    value: "BCA",
    label: "BCA",
  },
  {
    value: "BCOM",
    label: "BCOM",
  },
  {
    value: "BBA",
    label: "BBA",
  },
  {
    value: "BSC",
    label: "BSC",
  },
  {
    value: "BVOC",
    label: "BVOC",
  },
];

const SelectItems = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "Trending",
    label: "Trending",
  },
  {
    value: "Latest",
    label: "Latest",
  },
  {
    value: "Oldest",
    label: "Oldest",
  },
  {
    value: "Upcoming",
    label: "Upcoming",
  },
];

export function FilterBar() {
  return (
    <>
      <div className="flex text-gray-700 items-center cursor-pointer flex-wrap gap-3 font-normal px-0">
        {SelectItems.map((item) => (
          <div
            key={item.value}
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground hidden text-sm lg:block  hover:text-black rounded-full md:px-4 py-1.5 transition-colors duration-200 ease-in"
          >
            <p> {item.label}</p>
          </div>
        ))}
        <div className="block lg:hidden">
          <Select items={SelectItems} label="filter" />
        </div>
      </div>
      <div className="flex text-gray-700 items-center cursor-pointer  gap-3 font-normal  py-1 py-3">
        <ComboBox comboBoxItems={comboBoxItems} header="department"></ComboBox>
      </div>
    </>
  );
}
