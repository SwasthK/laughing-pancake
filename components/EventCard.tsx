import { IconExternalLink } from "@tabler/icons-react";
import { Tooltip } from "./Tooltip";
import { Link } from "./Link";

export function EventCard({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div draggable className="flex  flex-col rounded-2xl max-w-[18rem]">
      <div className="h-40 w-full relative  bg-slate-900 rounded-2xl rounded-b-none">
        <div className="bg-[#ebe6e6] text- px-4 py-0 rounded-md text-sm text-secondary-light shadow-sm absolute bottom-3 right-3">
          BCA
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-hidden px-6 py-5 bg-[#F3F1F0] rounded-2xl rounded-t-none">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold font-trebuchet">{title}</p>
        </div>
        <p className="text-secondary-light text-sm truncate">{description}</p>
        <div className="flex justify-between items-center text-sm">
          <Tooltip content="View event details">
            <Link href="/event/1">View</Link>
          </Tooltip>
          <div className="w-fit p-1 rounded-md cursor-pointer">
            <Tooltip content="Register now">
              <Link href="/event/1" className="bg-transparent block px-0">
                <IconExternalLink className=" h-6 w-6 text-blue-900" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
