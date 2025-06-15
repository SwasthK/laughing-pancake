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
        className={cn(
          "bg-[#262728] dark:bg-[#F3F1F0] text-[#F3F1F0] dark:text-[#262728] hover:bg-[#262728]/90 dark:hover:bg-[#F3F1F0]/90 transition-all duration-300",
          className
        )}
      >
        {children}
      </Button>
      <Command className="hidden">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <div className="bg-[#F3F1F0] border border-[#E6E4E4] rounded-lg overflow-hidden shadow-lg">
            <CommandInput
              className="font-medium text-[#262728] placeholder:text-[#666666] border-none focus:ring-0 bg-transparent [&>input]:text-[#262728]"
              placeholder="Type a command or search..."
            />
            <CommandList className="px-4 py-2 pb-4 bg-[#F3F1F0]">
              <CommandEmpty className="py-6">
                <p className="text-center font-medium text-[#262728]">
                  No results found.
                </p>
              </CommandEmpty>
              <CommandGroup
                heading="Suggestions"
                className="font-medium text-[#666666]"
              >
                <CommandItem to="/profile/me">
                  <CommandItemIconBox
                    icon={<User className="h-4 w-4 text-[#262728]" />}
                    label="Profile"
                  />
                </CommandItem>
                <CommandItem to="/events/create">
                  <CommandItemIconBox
                    icon={<Plus className="h-4 w-4 text-[#262728]" />}
                    label="Create Event"
                  />
                </CommandItem>
                <CommandItem to="/events">
                  <CommandItemIconBox
                    icon={<CalendarDays className="h-4 w-4 text-[#262728]" />}
                    label="My Events"
                  />
                </CommandItem>
                <CommandItem to="/leaderboard">
                  <CommandItemIconBox
                    icon={<TrophyIcon className="h-4 w-4 text-[#262728]" />}
                    label="Leaderboard"
                  />
                </CommandItem>
              </CommandGroup>
              <CommandSeparator className="bg-[#E6E4E4]" />
              <CommandGroup
                heading="Settings"
                className="font-medium text-[#666666]"
              >
                <CommandItem to="/settings">
                  <CommandItemIconBox
                    icon={<Settings className="h-4 w-4 text-[#262728]" />}
                    label="Settings"
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </div>
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
    <CommandItemDefault
      className={cn(
        "text-[#262728] hover:bg-[#262728]/5 rounded-md transition-colors duration-200",
        className
      )}
    >
      <Link
        href={to}
        target={target}
        className="w-full bg-transparent hover:bg-transparent"
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
    <div className={cn("flex items-center gap-3 py-1.5", className)}>
      {icon}
      <p className="text-[#262728] font-medium">{label}</p>
    </div>
  );
};
