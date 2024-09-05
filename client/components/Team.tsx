import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TeamTypes = {
  teamName: string;
  score: number;
  wickets: number;
  overs: number;
  balls: number;
  flag: string;
  fallback: string;
};
const Team = ({
  teamName,
  score,
  wickets,
  overs,
  balls,
  flag,
  fallback,
}: TeamTypes) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2>{teamName}</h2>
        <Avatar className="my-2">
          <AvatarImage src={flag} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="text-xs mt-4">
          <span>{score}</span> / <span>{wickets}</span>
        </div>
        <div>
          overs <span>{overs}</span>
        </div>
      </div>
    </>
  );
};

export default Team;
