export function EventCardSkeleton() {
  return (
    //width isnt flexible to md screen size
    <div className="flex flex-col lg:w-[26rem] w-80  animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 w-full relative rounded-lg rounded-b-none overflow-hidden bg-gray-200">
        {/* Organization badge placeholder */}
        <div className="bg-gray-300 px-4 py-0 rounded-md text-sm shadow-sm absolute bottom-3 right-3 h-6 w-24"></div>
      </div>
      {/* Content placeholder */}
      <div className="flex flex-col gap-3 overflow-hidden px-6 py-5 bg-[#F3F1F0] rounded-lg rounded-t-none">
        {/* Title placeholder */}
        <div className="flex justify-between items-center">
          <div className="h-7 w-3/4 bg-gray-300 rounded"></div>
        </div>
        {/* Description placeholder */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        {/* Actions placeholder */}
        <div className="flex justify-between items-center text-sm">
          <div className="h-5 w-16 bg-gray-300 rounded"></div>
          <div className="w-fit p-1 rounded-md">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
