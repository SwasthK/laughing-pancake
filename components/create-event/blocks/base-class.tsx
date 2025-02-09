import { cn } from "@/lib/utils";

export const BaseClass = ({
    children,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: any;
  }) => {
    return (
      <div
        onClick={onClick}
        className={cn(
          `flex bg-white min-w-28 rounded-md items-center gap-2.5 py-2 text-sm justify-center`,
          className
        )}
      >
        {children}
      </div>
    );
  };