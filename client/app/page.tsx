"use client";
import AddRuns from "@/components/AddRuns";
import Commentry from "@/components/Commentry";
import MainPlayers from "@/components/MainPlayers";
import PlayerScoreCard from "@/components/PlayerScoreCard";
import RunsArea from "@/components/RunsArea";
import TeamScoreCard from "@/components/TeamScoreCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { redirect } from "next/navigation";

import socket from "@/socket";
// import io from "socket.io-client";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  batsmanState,
  commentryState,
  playersState,
  scoreBoardState,
} from "@/states/state";
const SERVER_URL = "http://localhost:8000";

export default function Home() {
  const setPlayerRecoil = useSetRecoilState(playersState);
  const setScoreBoardState = useSetRecoilState(scoreBoardState);
  const [batsmanStateRecoil, setBatsmanStateRecoil] =
    useRecoilState(batsmanState);
  const [commentryRecoil, setCommentryRecoil] = useRecoilState(commentryState);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("players", (data) => {
      setPlayers(data[0]);

      setScoreBoardState({
        india: {
          teamName: "India",
          score: data[1][0].score,
          overs: data[1][0].overs,
          balls: data[1][0].balls,
          wickets: data[1][0].wicketsOut,
          flag: data[1][0].flag,
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


      setBatsmanStateRecoil((prev) => [...data[2]]);


      setCommentryRecoil((prev) => [...data[3]]);
    });

    return () => {
      socket.disconnect();
    };
  }, [setBatsmanStateRecoil, setCommentryRecoil, setScoreBoardState]);

  useEffect(() => {
    const matchIdFromStorage = localStorage.getItem("matchId");

    if (matchIdFromStorage) {
      const indianPlayers = players
        .filter((player: any) => player.teamName === "India")
        .map((player: any) => ({
          playerName: player.playerName,
          teamName: player.teamName,
        }));
      const pakistaniPlayers = players
        .filter((player: any) => player.teamName === "Pakistan")
        .map((player: any) => ({
          playerName: player.playerName,
          teamName: player.teamName,
        }));

      setPlayerRecoil({
        indianPlayers: indianPlayers as {
          playerName: string;
          teamName: string;
        }[],
        pakistaniPlayers: pakistaniPlayers as {
          playerName: string;
          teamName: string;
        }[],
      });
    } else {
      redirect("/match");
    }

    return () => {
      setPlayerRecoil({
        indianPlayers: [],
        pakistaniPlayers: [],
      });
    };
  }, [setPlayerRecoil, players]);
  return (
    <main className="w-full px-4 dark my-4">
      <h2 className="w-full text-center md:text-start text-lg py-2 md:px-24">
        Admin Panel
      </h2>
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex flex-col items-center w-full md:w-8/12 gap-8">
          <MainPlayers />
          <AddRuns />
          <RunsArea />
        </div>
        <div className="flex flex-col justify-start align-top items-start mx-auto w-full md:w-3/12 gap-8 my-6 md:my-0">
          <TeamScoreCard />
          <PlayerScoreCard />
          <Commentry />
        </div>
      </div>
    </main>
  );
}
