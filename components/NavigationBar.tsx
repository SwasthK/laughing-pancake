import { IconSearch } from "@tabler/icons-react";
import { Link as CustomLink } from "./Link";
import Link from "next/link";
import { DropdownMenu } from "./shadcn/DropDown";
import { ThemeToggle } from "./theme-provider";
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
    <div className="sticky top-[0px]  z-50 py-5  rounded-t-none border-[rgba(255,255,255,0.125)] border mt-3 lg:px-6 flex text-white justify-between backdrop-blur-sm backdrop-saturate-0  gap-2 flex-wrap items-center w-full rounded-lg ">
      <Link
        href={"/"}
        className="font-trebuchet text-3xl font-extrabold  text-black"
      >
        Festify
      </Link>

      <div>
        <div className="justify-end hidden lg:flex text-sm w-full lg:w-fit lg:space-x-3 rounded-md lg:bg-white bg-[#262728] px-2 py-1 text-gray-700 items-center font-normal">
          <>
            {NavItems.map((item) => (
              <CustomLink
                key={item.name}
                className="bg-transparent hover:bg-[#54ea54] text-secondary-dark hover:text-black rounded-md lg:px-4 py-1.5 transition-colors duration-300 ease-in"
                href={`${item.href}`}
              >
                <p> {item.name}</p>
              </CustomLink>
            ))}
            <SearchCommandPallete className="bg-[#262728] text-sm flex justify-between gap-2 hover:bg-[#54ea54] text-white hover:text-black rounded-md lg:px-4  transition-colors duration-300 ease-in h-fit py-1.5">
              <IconSearch className="h-4 w-4 lg:h-[1.15rem] lg:w-[1.15rem]"></IconSearch>
              <p className="text-sm ">Ctrl + K</p>
            </SearchCommandPallete>
          </>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <SearchCommandPallete className="bg-[#262728] h-10">
          <IconSearch className=""></IconSearch>
        </SearchCommandPallete>
        <ThemeToggle></ThemeToggle>
        <DropdownMenu />
      </div>
    </div>
  );
}
