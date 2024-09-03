import React from "react";
import Team from "./Team";

const TeamScoreCard = () => {
  return (
    <div className="border rounded-lg w-full items-cente p-3">
      <div className="flex justify-around ">
        <Team />
        <Team />
      </div>
    </div>
  );
};

export default TeamScoreCard;
