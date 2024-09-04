"use client";
import AddRuns from "@/components/AddRuns";
import Commentry from "@/components/Commentry";
import MainPlayers from "@/components/MainPlayers";
import PlayerScoreCard from "@/components/PlayerScoreCard";
import RunsArea from "@/components/RunsArea";
import TeamScoreCard from "@/components/TeamScoreCard";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// import { socket } from "@/socket";
import io from "socket.io-client";
import { useRecoilState } from "recoil";
import { playersState } from "@/states/state";
const SERVER_URL = "http://localhost:8000";

// fetch("http://localhost:8000")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// console.log(socket);

export default function Home() {
  const [match, setMatch] = useState(null);
  const [player, setPlayer] = useState([]);
  const [team, setTeam] = useState([]);
  const [log, setLog] = useState([]);

  const [playerRecoil, setPlayerRecoil] = useRecoilState(playersState);

  const [players, setPlayers] = useState([]);
  // const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("players", (data) => {
      console.log("players", data);
      setPlayers(data);
    });

    socket.emit("message", "Hello from client");

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const matchIdFromStorage = localStorage.getItem("matchId");
    if (matchIdFromStorage) {
      const indianPlayers = players
        .filter((player: any) => player.team === "India")
        .map((player: any) => player.name);
      const pakistaniPlayers = players
        .filter((player: any) => player.team === "Pakistan")
        .map((player: any) => player.name);

      setPlayerRecoil({
        indianPlayers: indianPlayers as never[],
        pakistaniPlayers: pakistaniPlayers as never[],
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
  }, [setPlayerRecoil, players]);
  return (
    <main className="w-full px-4 dark my-4">
      {/* <div>is connected {" " + isConnected}</div> */}
      {/* <button onClick={() => socket.connect()}>connect</button> */}

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
