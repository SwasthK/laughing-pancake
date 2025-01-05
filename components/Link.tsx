import { cn } from "@/lib/utils";
import { default as Navigator } from "next/link";

type LinkProps = {
  className?: string;
  target?: string;
};

export function Link({
  children,
  href,
  ...props
}: LinkProps & { children: React.ReactNode; href: string }) {
  return (
    <Navigator
      className={cn(`bg-black text-white px-4 py-1 rounded-md`, props.className)}
      href={href}
      target={props.target || "_self"}
    >
      {children}
    </Navigator>
  );
}
