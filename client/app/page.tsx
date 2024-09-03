import AddRuns from "@/components/AddRuns";
import Commentry from "@/components/Commentry";
import MainPlayers from "@/components/MainPlayers";
import PlayerScoreCard from "@/components/PlayerScoreCard";
import RunsArea from "@/components/RunsArea";
import TeamScoreCard from "@/components/TeamScoreCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full mx-auto dark my-4">
      <h2 className="w-full text-center md:text-start text-lg py-2 md:px-24">
        Admin Panel
      </h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col items-center w-full md:w-8/12 gap-8 md:px-8">
          <MainPlayers />
          <AddRuns />
          <RunsArea />
        </div>
        <div className="flex flex-col justify-start align-top items-start mx-auto w-full px-4 md:w-3/12 gap-8 my-6 md:my-0">
          <TeamScoreCard />
          <PlayerScoreCard />
          <Commentry />
        </div>
      </div>
    </main>
  );
}
