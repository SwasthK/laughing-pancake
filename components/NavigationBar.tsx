import { IconSearch } from "@tabler/icons-react";
import { Link as CustomLink } from "./Link";
import Link from "next/link";
import { DropdownMenu } from "./shadcn/DropDown";
import { SearchCommandPallete } from "./command-pallete";

const NavItems = [
  {
    name: "LeaderBoard",
    href: "/leaderboard",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Support",
    href: "/support",
  },
];

export function NavigationBar() {
  return (
    <div className="sticky top-[0px] z-50 py-4 rounded-lg border border-[#E6E4E4] dark:border-[#2A2A2A] mt-3 lg:px-6 flex justify-between backdrop-blur-sm backdrop-saturate-150 gap-2 flex-wrap items-center w-full bg-[#F3F1F0]/80 dark:bg-[#1A1A1A]/80">
      <Link
        href={"/"}
        className="group font-serif text-3xl font-black text-[#262728] dark:text-white hover:text-[#262728]/90 dark:hover:text-white/90 transition-all duration-300 hover:scale-105"
      >
        <span className="relative">
          Festify
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#262728] dark:bg-white transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>

      <div>
        <div className="justify-end hidden lg:flex text-sm w-full lg:w-fit lg:space-x-3 rounded-md bg-[#F3F1F0] dark:bg-[#262728] px-3 py-2 text-[#262728] dark:text-white items-center font-medium">
          <>
            {NavItems.map((item) => (
              <CustomLink
                key={item.name}
                className="bg-transparent hover:bg-[#262728]/10 dark:hover:bg-white/10 text-[#262728] dark:text-white hover:text-[#262728]/90 dark:hover:text-white/90 rounded-md lg:px-4 py-1.5 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                href={`${item.href}`}
              >
                {item.name}
              </CustomLink>
            ))}
            <SearchCommandPallete className="bg-[#262728] dark:bg-white text-white dark:text-[#262728] flex justify-between gap-2 hover:bg-[#262728]/90 dark:hover:bg-white/90 rounded-md lg:px-4 transition-all duration-300 h-fit py-1.5 hover:scale-105 hover:shadow-md">
              <IconSearch className="h-4 w-4 lg:h-[1.15rem] lg:w-[1.15rem] transition-transform duration-300 hover:rotate-12" />
              <p className="text-sm">Ctrl + K</p>
            </SearchCommandPallete>
          </>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <DropdownMenu />
      </div>
    </div>
  );
}
