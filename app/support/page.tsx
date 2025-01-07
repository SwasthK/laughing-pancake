import { IconBrandGithub } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 flex-col items-center gap-2 py-4 pb-8 h-full lg:h-[calc(100vh-150px)] place-items-center">
      <div className="w-full text-center flex flex-col lg:col-span-2 items-center gap-2 py-20 rounded-md px-4 h-full border shadow-sm border-[#33333331] bg-[#E6F4EB]">
        <p className="text-3xl font-semibold">
          Get <span className="text-bgSecondary">Help </span>
        </p>

        <p className="text-black text-sm">
          For any issues or bugs in the app, please contact us at this
          email
        </p>

        <p className="mt-2 font-mono text-violet-900 font-semibold cursor-pointer">
          support.festify@gmail.com
        </p>
      </div>

      <div className="w-full text-center flex flex-col lg:col-span-3 items-center gap-2 py-20 rounded-md px-4 h-full border shadow-sm border-[#33333331] bg-[#E6F4EB]">
        <p className="text-3xl font-semibold">
          Repository
          <IconBrandGithub className="inline-block ml-2 h-8 w-8"></IconBrandGithub>
        </p>

        <p className="text-black text-sm">
          Feel free to contribute to the project on GitHub. We welcome all
          contributions !
        </p>

        <p className="mt-2 font-mono text-violet-900 font-semibold cursor-pointer">
          https://github.com/festify
        </p>
      </div>

      <div className="w-full text-center flex flex-col items-center lg:col-span-5 gap-2 py-20 rounded-md px-4 h-full border shadow-sm border-[#33333331] bg-[#E6F4EB]">
        <p className="text-3xl font-semibold">
          Meet the <span className="text-bgSecondary">Team </span>
          <IconBrandGithub className="inline-block ml-2 h-8 w-8"></IconBrandGithub>
        </p>

        <p className="text-black text-sm">
          Get in touch with us . We are always open to feedback and suggestions
          !
        </p>

        <div className="flex gap-2 font-mono text-violet-900 font-semibold mt-2">
          <p className="cursor-pointer">Swasthik K</p>
          <p>&</p>
          <p className="cursor-pointer">Shainil P S</p>
        </div>
      </div>
    </div>
  );
}
