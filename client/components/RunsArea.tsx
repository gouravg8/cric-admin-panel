"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { currentPlayerPlaying, runBoardState } from "@/states/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import findTypeOfBall from "@/lib/findTypeOfBall";

function RunsArea() {
  const [runBoardArea, setRunBoardArea] = useState<any>([]);

  const [typeAndValueRecoil, setTypeAndValueRecoil] =
    useRecoilState(runBoardState);
  const currentPlayerPlay = useRecoilValue(currentPlayerPlaying);

  function onSubmit(e: any) {
    e.preventDefault();
    if (
      currentPlayerPlay.striker === "" ||
      currentPlayerPlay.nonStriker === "" ||
      currentPlayerPlay.bowler === ""
    ) {
      alert("Please select a player to play");
      return;
    }
    console.log("from run board area", runBoardArea);
    const [typesOfBall, totalRuns, wicket] = findTypeOfBall(typeAndValueRecoil);
    console.log("types of ball", typesOfBall, totalRuns, wicket);

    // send data to server to specific route based on type of ball using axios
    if (typesOfBall === "normal") {
      try {
        const matchId = localStorage.getItem("matchId");
        axios.post(
          process.env.NEXT_PUBLIC_URL + "/api/admin/normal-and-overthrow",
          {
            matchId: matchId,
            typeOfBall: typesOfBall,
            wicket: wicket,
            bowlerId: currentPlayerPlay.bowler,
            striker: currentPlayerPlay.striker,
            nonStriker: currentPlayerPlay.nonStriker,
            extraType: typesOfBall,
            runs: totalRuns,
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "bye") {
      try {
        const matchId = localStorage.getItem("matchId");
        axios.post(process.env.NEXT_PUBLIC_URL + "/api/admin/bye-and-extra", {
          matchId: matchId,
          bowlerId: currentPlayerPlay.bowler,
          extraType: typesOfBall,
          extraRuns: totalRuns,
          teamId: currentPlayerPlay,
          playerId: currentPlayerPlay.striker,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "noball") {
      try {
        const matchId = localStorage.getItem("matchId");
        axios.post(
          process.env.NEXT_PUBLIC_URL + "/api/admin/noball-and-extra",
          {
            matchId: matchId,
            bowlerId: currentPlayerPlay.bowler,
            playerId: currentPlayerPlay.striker,
            extras: typesOfBall,
            extraRuns: totalRuns,
            teamId: currentPlayerPlay,
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "wide") {
      try {
        const matchId = localStorage.getItem("matchId");
        axios.post(process.env.NEXT_PUBLIC_URL + "/api/admin/wide-and-extra", {
          matchId: matchId,
          bowlerId: currentPlayerPlay.bowler,
          playerId: currentPlayerPlay.striker,
          extras: typesOfBall,
          extraRuns: totalRuns,
          teamId: currentPlayerPlay,
        });
      } catch (error) {
        console.log(error);
      }
    }else if(typesOfBall === 'wicket'){
      try {
        const matchId = localStorage.getItem("matchId");
        axios.post(process.env.NEXT_PUBLIC_URL + "/api/admin/wicket", {
          matchId: matchId,
          bowlerId: currentPlayerPlay.bowler,
          playerId: currentPlayerPlay.striker,
          teamId: currentPlayerPlay,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setRunBoardArea([]);
    setTypeAndValueRecoil([
      {
        extraType: "",
        value: -1,
      },
    ]);
  }

  useEffect(() => {
    let filteredData = typeAndValueRecoil.filter(
      (item: any) => item.extraType !== "" && item.value !== -1
    );
    setRunBoardArea(filteredData);
  }, [typeAndValueRecoil]);

  return (
    <div className="w-10/12 space-y-6 items-center">
      {runBoardArea.length > 0 ? (
        <div className="flex border gap-3 rounded p-4">
          {runBoardArea.map((item: { extraType: string; value: number }) => {
            return (
              <div
                key={Math.random() * 100}
                className="w-fit flex gap-3 text-black bg-gray-200 p-2 rounded"
              >
                <span className="text-xs">
                  {item.extraType}:{item.value}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex border gap-3 rounded p-8 text-zinc-400">
          <p>Runs will be shown over here</p>
        </div>
      )}

      <Button onClick={onSubmit} type="submit" className="float-right w-full">
        Submit
      </Button>
    </div>
  );
}
export default RunsArea;
