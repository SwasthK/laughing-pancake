import {
  Tooltip as TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipProps = {
  className?: string;
  delayDuration?: number;
  children: React.ReactNode;
  content: string;
};

export function Tooltip({
  children,
  content,
  ...props
}: TooltipProps ) {
  return (
    <TooltipProvider delayDuration={props?.delayDuration || 0}>
      <TooltipContainer>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={props?.className}>
          <p>{content}</p>
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  );
}
