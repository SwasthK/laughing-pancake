import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#E6E4E4] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#262728] text-[#F3F1F0] hover:bg-[#262728]/90",
        secondary:
          "border-transparent bg-[#F3F1F0] text-[#262728] hover:bg-[#F3F1F0]/90",
        outline: "border-[#E6E4E4] text-[#262728] hover:bg-[#F3F1F0]",
        muted:
          "border-transparent bg-[#F3F1F0]/50 text-[#666666] hover:bg-[#F3F1F0]/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
