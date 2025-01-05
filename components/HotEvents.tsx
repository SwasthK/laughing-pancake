import { Link } from "./Link";

export function HotEvents() {
  return (
    <div className="relative p-6 px-6 flex text-white  gap-7 flex-wrap items-center w-full rounded-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 ">
      <div className="h-32 w-60 rounded-md bg-blue-100"></div>
      <div className="flex flex-col gap-3 justify-between h-32 ">
        <div className="flex flex-col gap-2">
          <p className=" font-light">
            <span className="font-semibold text-3xl">Ekshunyam</span>{" "}
            <span className="text-xs">[BCA]</span>
          </p>
          <p className="text-sm text-secondary-light max-w-72 sm:max-w-80 truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, nulla.
          </p>
        </div>
        <Link href="/" className="w-fit bg-white text-black rounded-md text-sm">
          Visit
        </Link>
      </div>
    </div>
  );
}
