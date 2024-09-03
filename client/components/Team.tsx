import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Team = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2>Team name</h2>
        <Avatar className="my-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-xs mt-4">
          <span>433</span> / <span>4</span>
        </div>
        <div>
          overs <span>12.3</span>
        </div>
      </div>
    </>
  );
};

export default Team;
