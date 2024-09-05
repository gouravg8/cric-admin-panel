"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  batsmanState,
  commentryState,
  currentPlayerPlaying,
  runBoardState,
  scoreBoardState,
} from "@/states/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import findTypeOfBall from "@/lib/findTypeOfBall";
import socket from "@/socket";

function RunsArea() {
  const [runBoardArea, setRunBoardArea] = useState<any>([]);
  const setScoreBoardState = useSetRecoilState(scoreBoardState);
  const [batsmanStateRecoil, setBatsmanStateRecoil] =
    useRecoilState(batsmanState);
  const setCommentryRecoil = useSetRecoilState(commentryState);

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

    const [typesOfBall, totalRuns, wicket, fours, sixs] =
      findTypeOfBall(runBoardArea);

    // console.log("types of ball", typesOfBall, totalRuns, wicket);

    socket.on("normalRuns_Overthrow_update", (data: any) => {
      // console.log(data);

      setScoreBoardState({
        india: {
          teamName: "India",
          score: data.team.score,
          overs: data.team.overs,
          balls: data.team.balls,
          wickets: data.team.wicketsOut,
          flag: data.team.flag,
        },
        pakistan: {
          teamName: "Pakistan",
          score: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          flag: "https://www.pinclipart.com/picdir/big/136-1361502_pakistan-flag-png-transparent-pakistan-flag-clipart.png",
        },
      });

      setBatsmanStateRecoil((prev) => [...data.batPlayerOut]);

      setCommentryRecoil((prev) => [...data.log]);
      // console.log("normal data from server", data);
    });

    socket.on("bye_extra_update", (data: any) => {
      setScoreBoardState({
        india: {
          teamName: "India",
          score: data.team.score,
          overs: data.team.overs,
          balls: data.team.balls,
          wickets: data.team.wicketsOut,
          flag: data.team.flag,
        },
        pakistan: {
          teamName: "Pakistan",
          score: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          flag: "https://www.pinclipart.com/picdir/big/136-1361502_pakistan-flag-png-transparent-pakistan-flag-clipart.png",
        },
      });

      setBatsmanStateRecoil((prev) => [...data.batPlayerOut]);

      setCommentryRecoil((prev) => [...data.log]);
      // console.log("bye extra data from server", data);
    });

    socket.on("noball_extra_update", (data: any) => {
      setScoreBoardState({
        india: {
          teamName: "India",
          score: data.team.score,
          overs: data.team.overs,
          balls: data.team.balls,
          wickets: data.team.wicketsOut,
          flag: data.team.flag,
        },
        pakistan: {
          teamName: "Pakistan",
          score: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          flag: "https://www.pinclipart.com/picdir/big/136-1361502_pakistan-flag-png-transparent-pakistan-flag-clipart.png",
        },
      });

      setBatsmanStateRecoil((prev) => [...data.batPlayerOut]);

      setCommentryRecoil((prev) => [...data.log]);

      // console.log("noball extra data from server", data);
    });

    socket.on("wide_extra_update", (data: any) => {
      setScoreBoardState({
        india: {
          teamName: "India",
          score: data.team.score,
          overs: data.team.overs,
          balls: data.team.balls,
          wickets: data.team.wicketsOut,
          flag: data.team.flag,
        },
        pakistan: {
          teamName: "Pakistan",
          score: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          flag: "https://www.pinclipart.com/picdir/big/136-1361502_pakistan-flag-png-transparent-pakistan-flag-clipart.png",
        },
      });

      setBatsmanStateRecoil((prev) => [...data.batPlayerOut]);

      setCommentryRecoil((prev) => [...data.log]);

      // console.log("wide extra data from server", data);
    });

    socket.on("wicket", (data: any) => {
      setScoreBoardState({
        india: {
          teamName: "India",
          score: data.team.score,
          overs: data.team.overs,
          balls: data.team.balls,
          wickets: data.team.wicketsOut,
          flag: data.team.flag,
        },
        pakistan: {
          teamName: "Pakistan",
          score: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          flag: "https://www.pinclipart.com/picdir/big/136-1361502_pakistan-flag-png-transparent-pakistan-flag-clipart.png",
        },
      });

      setBatsmanStateRecoil((prev) => [...data.batPlayerOut]);

      setCommentryRecoil((prev) => [...data.log]);

      // console.log("wicket from server", data);
    });

    // UPDATE ON BALL/MATCH STATE ACC TO TYPE OF BALL

    const matchId = localStorage.getItem("matchId");
    if (typesOfBall === "normal") {
      try {
        socket.emit("normal_and_overthrow", {
          matchId,
          runs: totalRuns,
          bowlerName: currentPlayerPlay.bowler,
          batsmanName: currentPlayerPlay.striker,
          fours,
          sixs,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "bye") {
      try {
        socket.emit("bye_and_extra", {
          matchId: matchId,
          bowlerName: currentPlayerPlay.bowler,
          extraType: typesOfBall,
          extraRuns: totalRuns,
          batsmanName: currentPlayerPlay.striker,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "noball") {
      try {
        socket.emit("noball_and_extra", {
          extraRuns: totalRuns,
          batsmanName: currentPlayerPlay.striker,
          bowlerName: currentPlayerPlay.bowler,
          matchId: matchId,
          extraType: typesOfBall,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "wide") {
      try {
        socket.emit("wide_and_extra", {
          matchId: matchId,
          bowlerName: currentPlayerPlay.bowler,
          batsmanName: currentPlayerPlay.striker,
          extras: typesOfBall,
          extraRuns: totalRuns,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (typesOfBall === "wicket") {
      try {
        socket.emit("wicket", {
          matchId: matchId,
          batsmanName: currentPlayerPlay.striker,
          bowlerName: currentPlayerPlay.bowler,
          wicket: true,
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
