"use client";
import AddRuns from "@/components/AddRuns";
import Commentry from "@/components/Commentry";
import MainPlayers from "@/components/MainPlayers";
import PlayerScoreCard from "@/components/PlayerScoreCard";
import RunsArea from "@/components/RunsArea";
import TeamScoreCard from "@/components/TeamScoreCard";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { playersState } from "@/states/state";
const SERVER_URL = "http://localhost:8000";

// const socket = io();

export default function Home() {
  const [matchData, setMatchData] = useState<any>(null);
  const [playerData, setPlayerData] = useState<any>(null);
  const [teamData, setTeamData] = useState<any>(null);
  const [logData, setLogData] = useState<any>(null);

  const [playerRecoil, setPlayerRecoil] = useRecoilState(playersState);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
  //   socket.on("matchUpdate", (data) => {
  //     console.log("Match Update:", data);
  //     setMatchData(data);
  //   });

  //   socket.on("playerUpdate", (data) => {
  //     console.log("Player Update:", data);
  //     setPlayerData(data);
  //   });
  //   socket.on("teamUpdate", (data) => {
  //     console.log("Team Update:", data);
  //     setTeamData(data);
  //   });

  //   socket.on("logUpdate", (data) => {
  //     console.log("Log Update:", data);
  //     setLogData(data);
  //   });

  //   return () => {
  //     socket.off("matchUpdate");
  //     socket.off("playerUpdate");
  //     socket.off("teamUpdate");
  //     socket.off("logUpdate");
  //   };
  // }, []);

  useEffect(() => {
    const matchIdFromStorage = localStorage.getItem("matchId");
    if (matchIdFromStorage) {
      fetch(SERVER_URL + "/api/match/" + matchIdFromStorage)
        .then((res) => res.json())
        .then((data) => {
          const indianPlayers = data.data.players
            .filter((player: any) => player.team === "India")
            .map((player: any) => player.name);
          const pakistaniPlayers = data.data.players
            .filter((player: any) => player.team === "Pakistan")
            .map((player: any) => player.name);

          setPlayerRecoil({
            indianPlayers: indianPlayers,
            pakistaniPlayers: pakistaniPlayers,
          });

          console.log(indianPlayers, pakistaniPlayers);
        });
    } else {
      // redirect to /match
      redirect("/match");
    }

    return () => {
      setPlayerRecoil({
        indianPlayers: [],
        pakistaniPlayers: [],
      });
    };
  }, [setPlayerRecoil]);
  return (
    <main className="w-full px-4 dark my-4">
      {/* <div>
        <h1>Cricket Scoring Dashboard</h1>
        <h2>Match Data:</h2>
        <pre>{JSON.stringify(matchData, null, 2)}</pre>
        <h2>Player Data:</h2>
        <pre>{JSON.stringify(playerData, null, 2)}</pre>
        <h2>Team Data:</h2>
        <pre>{JSON.stringify(teamData, null, 2)}</pre>
        <h2>Log Data:</h2>
        <pre>{JSON.stringify(logData, null, 2)}</pre>
      </div> */}

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
