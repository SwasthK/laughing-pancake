import { PosterType } from "@/types";
import { Copy, NotepadText, PhoneCall } from "lucide-react";

export const ContactInfo = ({ phoneNumber }: { phoneNumber: PosterType.Phone }) => (
  <div className="bg-[#DADADA] rounded-xl w-full h-full py-8 px-8 flex flex-col justify-between md:flex-row gap-7">
    <BrochureSection />
    <PhoneSection phoneNumber={phoneNumber} />
  </div>
);

export const BrochureSection = () => (
  <div>
    <p className="text-xl font-semibold text-[#666666]">Brochure</p>
    <div className="flex items-center gap-2 hover:text-indigo-800 duration-100 ease-in transition-colors cursor-pointer">
      <p className="text-3xl font-semibold">Download here</p>
      <NotepadText />
    </div>
  </div>
);

export const PhoneSection = ({ phoneNumber }: { phoneNumber: PosterType.Phone }) => (
  <div className="md:w-fit">
    <p className="text-sm mb-3">For any query about this event</p>
    <div className="flex items-center gap-4 relative">
      <PhoneCall className="h-5 w-5" />
      <p className="text-xl font-semibold">{phoneNumber}</p>
      <CopyButton />
    </div>
  </div>
);

export const CopyButton = () => (
  <div className=" cursor-pointer flex items-center gap-2 px-2 py-2 bg-gray-200 rounded-lg transition-all duration-300 hover:bg-gray-300 active:scale-95">
    <Copy className="h-4 w-4 text-gray-600 hover:text-gray-800 transition-all" />
  </div>
);