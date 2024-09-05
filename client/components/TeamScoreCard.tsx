import React from "react";
import Team from "./Team";
import { useRecoilValue } from "recoil";
import { scoreBoardState } from "@/states/state";

const TeamScoreCard = () => {
  const { india, pakistan } = useRecoilValue(scoreBoardState);
  return (
    <div className="border rounded-lg w-full items-cente p-3">
      <div className="flex justify-around ">
        <Team
          teamName={india.teamName}
          score={india.score}
          wickets={india.wickets}
          overs={india.overs}
          balls={india.balls}
          flag={india.flag}
          fallback="IND"
        />
        <Team
          teamName={pakistan.teamName}
          score={pakistan.score}
          wickets={pakistan.wickets}
          overs={pakistan.overs}
          balls={pakistan.balls}
          flag={pakistan.flag}
          fallback="PAK"
        />
      </div>
    </div>
  );
};

export default TeamScoreCard;
