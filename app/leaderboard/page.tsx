import { IconFlagBolt } from "@tabler/icons-react";

export default function LeaderBoard() {
  return (
    <div>
      <div className="flex gap-2 flex-col p-4 justify-center items-center bg-[#DADADA] rounded-xl px-6 py-6">
        <div className="flex gap-2 items-center">
          <p className="text-5xl font-semibold ">
            Leader<span className="text-[#666666]">board</span>
          </p>
          <p className="text-[2.40rem]">🏆</p>
        </div>
        <p className="text-sm">
          Total of 11 departments in the race
          <IconFlagBolt className="inline-block mx-2 h-4 w-4" />
        </p>
      </div>
    </div>
  );
}
