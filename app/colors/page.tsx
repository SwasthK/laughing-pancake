import { ThemeToggle } from "@/components/theme-provider";

export default function Colors() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-screen bg-[#e6e4e4] dark:bg-black">
      <div className="grid grid-cols-4">
        <h1 className="text-5xl font bg-[#fff] p-8">#fffff</h1>
        <h1 className="text-5xl font bg-[#000] p-8">#00000</h1>
        <h1 className="text-5xl font bg-[#BBF99E] p-8">#BBF99E</h1>
        <h1 className="text-5xl font bg-[#262728] p-8">#262728</h1>
        <h1 className="text-5xl font bg-[#F2F2F2] p-8">#F2F2F2</h1>
        <h1 className="text-5xl font bg-[#54ea54] p-8">#54ea54</h1>
        <h1 className="text-5xl font bg-[#f2f2f2] p-8">#f2f2f2</h1>
        <h1 className="text-5xl font bg-[#E2F4C4] p-8">#E2F4C4</h1>
        <h1 className="text-5xl font bg-[#232323] p-8">#232323</h1>
        <h1 className="text-5xl font bg-[#EDEDED] p-8">#EDEDED</h1>
        <h1 className="text-5xl font bg-[#DADADA] p-8">#DADADA</h1>
        <h1 className="text-5xl font bg-[#F3F1F0] p-8">#F3F1F0</h1>
        <h1 className="text-5xl font bg-[#E6F4EB] p-8">#E6F4EB</h1>
      </div>
      <p className="text-sm text-secondary-dark">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim,
        exercitationem.
      </p>
      <ThemeToggle />
    </div>
  );
}
