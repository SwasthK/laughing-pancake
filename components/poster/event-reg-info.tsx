"use client";

import { Info, Users } from "lucide-react";
import RegisterButton from "../regiser-for-event/register-button";

export const RegistrationInfo = ({
  closingDate,
  link,
  programSlug,
}: {
  closingDate: string;
  link: string;
  programSlug: string;
}) => (
  <div className="flex flex-col gap-4 md:flex-row justify-between relative pt-6 pb-3 items-center ">
    <div className="w-full md:w-fit flex items-center gap-2 bg-indigo-50 p-3 rounded-md border border-indigo-100">
      <Users className="h-5 w-5 text-indigo-600" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-indigo-700 font-mono text-sm">
          Team registration only
        </p>
      </div>
    </div>
    {/* *************register button start (external farm only}************* */}
    <RegisterButton link={link} programSlug={programSlug} />
    {/* *************register button end************* */}
    <div className="py-3 absolute bottom-[-40px] left-0 flex items-center gap-2">
      <Info className="h-3 w-3" />
      <p className="text-xs text-red-900">
        Registration closes on{" "}
        <span className="font-semibold">{closingDate}</span>
      </p>
    </div>
  </div>
);
