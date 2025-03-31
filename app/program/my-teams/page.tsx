"use client";
import JoinedTeams from "@/components/team/joined-team";
import MyTeams from "@/components/team/my-team";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <div className="w-full h-10 flex justify-center gap-2">
        <Button
          variant="ghost"
          className={`${toggle ? "bg-gray-300" : "bg-transparent"} hover:bg-gray-300`}
          onClick={() => setToggle(true)}
        >
          My Teams
        </Button>
        <Button
          variant="ghost"
          className={`${!toggle ? "bg-gray-300" : "bg-transparent"} hover:bg-gray-300`}
          onClick={() => setToggle(false)}
        >
          Joined Teams
        </Button>
      </div>
      <div>{toggle ? <MyTeams /> : <JoinedTeams />}</div>
    </div>
  );
}
