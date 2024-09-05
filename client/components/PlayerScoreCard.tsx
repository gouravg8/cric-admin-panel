import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecoilValue } from "recoil";
import { batsmanState } from "@/states/state";

type PlayerScore = {
  playerName: string;
  run: number;
  ball: number;
  sixes: number;
  fours: number;
};

const PlayerScoreCard = () => {
  const batsmanScoreRecoil = useRecoilValue(batsmanState);

  return (
    <div className="w-full">
      <ScrollArea className="h-[215px] w-full rounded-md border p-4">
        <Table className="w-full">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Batsman</TableHead>
              <TableHead>Run</TableHead>
              <TableHead>Ball</TableHead>
              <TableHead>4s</TableHead>
              <TableHead>6s</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {batsmanScoreRecoil.map((player: any) => (
              <TableRow
                key={Math.floor(Math.random() * 9999) + "" + player.name}
              >
                <TableCell>{player.playerName}</TableCell>
                <TableCell>{player.runs}</TableCell>
                <TableCell>{player.balls}</TableCell>
                <TableCell>{player.fours}</TableCell>
                <TableCell>{player.sixes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default PlayerScoreCard;
