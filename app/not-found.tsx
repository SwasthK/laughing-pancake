import { Link } from "@/components/Link";

export default function () {
  return (
    <div className="py-16">
      <div className="min-h-[calc(100vh-250px)] gap-2 flex flex-col justify-center items-center">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold">
          404 Not Found
        </p>
        <p className="text-sm md:text-base text-secondary-light ">
          The page you are looking to visit does not exist
        </p>
        <Link
          href="/"
          className="hover:bg-slate-800 transition-colors duration-150 ease-in mt-3"
        >
          Fallback
        </Link>
      </div>
    </div>
  );
}
