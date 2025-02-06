"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem as CommandItemDefault,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "./Link";
import { CalendarDays, Plus, Settings, TrophyIcon, User } from "lucide-react";

export const SearchCommandPallete = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        className={cn("bg-black text-white rounded-md", className)}
      >
        {children}
      </Button>
      <Command className="hidden">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            className="font-mono"
            placeholder="Type a command or search..."
          />
          <CommandList className=" px-4 text-sm py-2 pb-4 bg-red-50">
            <CommandEmpty>
              <p className="text-center font-mono">No results found.</p>
            </CommandEmpty>
            <CommandGroup heading="Suggestions" className="font-mono">
              <CommandItem to="/profile">
                <CommandItemIconBox icon={<User />} label="Profile" />
              </CommandItem>
              <CommandItem to="/events/create">
                <CommandItemIconBox icon={<Plus />} label="Create Event" />
              </CommandItem>
              <CommandItem to="/events">
                <CommandItemIconBox icon={<CalendarDays />} label="My event" />
              </CommandItem>
              <CommandItem to="/leaderboard">
                <CommandItemIconBox icon={<TrophyIcon />} label="Leaderboard" />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings" className="font-mono">
              <CommandItem to="/settings">
                <CommandItemIconBox icon={<Settings />} label="Settings" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </>
  );
};

const CommandItem = ({
  children,
  className,
  to,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  to: string;
  target?: string;
}) => {
  return (
    <CommandItemDefault className={className}>
      <Link
        href={to}
        target={target}
        className="bg-transparent text-black px-0 py-0 rounded-none"
      >
        {children}
      </Link>
    </CommandItemDefault>
  );
};

const CommandItemIconBox = ({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {icon}
      <p>{label}</p>
    </div>
  );
};
