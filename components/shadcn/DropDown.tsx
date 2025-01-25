import {
  CalendarDays,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  TrophyIcon,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu as DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem as DropdownItemWrapper,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip } from "../Tooltip";
import Link from "next/link";
import React from "react";

export function DropdownMenu() {
  return (
    <DropdownMenuContainer>
      <Tooltip
        content="Account settings"
        className="text-[.80rem] bg-[#262728] text-white shadow-none border-none"
        delayDuration={500}
      >
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem to="/profile/user">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem to="/events/create">
            <Plus />
            <span>Create event</span>
          </DropdownMenuItem>
          <DropdownMenuItem to="/">
            <CalendarDays />
            <span>My events</span>
          </DropdownMenuItem>
          <DropdownMenuItem to="/leaderboard">
            <TrophyIcon />
            <span>Leaderboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem to="/">
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem to="https://github.com/SwasthK/laughing-pancake" target="_blank">
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem to="/">
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem to="/">
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
}

const DropdownMenuItem = ({
  to,
  target,
  children,
}: {
  to: string;
  target?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={to} target={target || "_self"}>
      <DropdownItemWrapper>{children}</DropdownItemWrapper>
    </Link>
  );
};
