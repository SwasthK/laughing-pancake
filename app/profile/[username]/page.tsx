import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UserProfilePrivate() {
  return (
    <div className="lg:py-16 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative">
        <div className="flex gap-10 flex-col lg:h-[calc(100vh-250px)] justify-center  bg-[#DADADA] rounded-xl px-8 py-20 lg:px-6 xl:p-20 ">
          <p className="text-xl font-semibold absolute top-4 left-7">
            About <span className="text-[#666666]">you</span>
          </p>
          <div className="flex gap-8 lg:flex-row flex-col">
            <Avatar className="cursor-pointer h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 overflow-hidden truncate">
              <p className="text-3xl font-semibold">RockyJon</p>
              <p className="text-sm">rockjon@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold font-trebuchet text-sm">
              Something about me
            </p>
            <p className="text-sm font-mono">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit earum voluptate architecto?
            </p>
          </div>
          <div className="flex gap-4 px-4 justify-center items-center">
            <StatBox value={11} label="Posts" />
            <StatBox value={"BCA"} label="Dept" />
            <StatBox value={"12"} label="Posts" />
          </div>
        </div>

        <div className="flex relative gap-10 flex-col lg:h-[calc(100vh-250px)] justify-center  bg-[#DADADA] rounded-xl px-8 py-20 lg:px-6  md:p-20 ">
          <p className="text-xl font-semibold absolute top-4 left-7">
            Update your <span className="text-[#666666]">profile</span>
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Username</p>
              <div className="flex flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                <Input
                  type="text"
                  placeholder="RockyJon"
                  className="font-mono"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Bio</p>
                <div className="flex flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                  <Textarea
                    className="resize-none font-mono"
                    placeholder="Enter anything about you"
                  />
                </div>
              </div>
              <div className="flex mt-8 flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                <Button className="w-full" disabled>Update</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatBox = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => {
  return (
    <>
      <div className="bg-[#F5F5F5] flex items-center justify-center flex-col w-24 p-4 rounded-xl cursor-pointer hover:bg-[#54ea54] transition-colors duration-200 ease-in">
        <p className="font-bold">{value.toString()}</p>
        <p className="font-mono text-sm">{label}</p>
      </div>
    </>
  );
};
