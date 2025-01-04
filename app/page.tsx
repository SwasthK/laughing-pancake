import { ThemeToggle } from "@/components/theme-provider";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-screen bg-yellow-200 dark:bg-black">
      <h1 className="text-5xl font">Next App</h1>
      <ThemeToggle />
    </div>
  );
}
