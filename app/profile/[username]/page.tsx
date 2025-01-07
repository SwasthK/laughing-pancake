import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function UserProfilePrivate() {
  return (
    <div className="lg:py-16 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative">
        <div className="flex gap-10 flex-col lg:h-[calc(100vh-250px)] justify-center  bg-[#DADADA] rounded-xl px-8 py-20 lg:px-6 xl:p-20 ">
          <p className="text-xl font-semibold absolute top-4 left-7">
            Know <span className="text-[#666666]">me</span>
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
            <p className="text-sm font-pnpm run dev">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit earum voluptate architecto?
            </p>
          </div>
          <div className="flex gap-4 px-4 justify-center items-center">
            <div className="bg-[#F5F5F5] flex items-center justify-center flex-col w-24 p-4 rounded-xl cursor-pointer hover:bg-[#54ea54] transition-colors duration-200 ease-in">
              <p className="font-bold">11</p>
              <p className="font-mono text-sm">Posts</p>
            </div>
            <div className="bg-[#F5F5F5] flex items-center justify-center flex-col w-24 p-4 rounded-xl cursor-pointer hover:bg-[#54ea54] transition-colors duration-200 ease-in">
              <p className="font-bold">BCA</p>
              <p className="font-mono text-sm">Dept</p>
            </div>
            <div className="bg-[#F5F5F5] flex items-center justify-center flex-col w-24 p-4 rounded-xl cursor-pointer hover:bg-[#54ea54] transition-colors duration-200 ease-in">
              <p className="font-bold">11</p>
              <p className="font-mono text-sm">Posts</p>
            </div>
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
                <Button disabled type="submit">
                  Update
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm">Email</p>
              <div className="flex flex-col xl:flex-row w-full max-w-sm items-start xl:items-center gap-2">
                <Input
                  type="email"
                  placeholder="rockjon@gmail.com"
                  className="font-mono"
                />
                <Button disabled type="submit">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
