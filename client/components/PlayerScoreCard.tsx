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

const PlayerScoreCard = () => {
  const PlayerScore = [
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
    {
      batsman: "Rohit",
      run: 34,
      ball: 10,
      fours: 4,
      sixes: 1,
    },
  ];
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
            {PlayerScore.map((player) => (
              <TableRow key={player.batsman}>
                <TableCell className="font-medium">{player.batsman}</TableCell>
                <TableCell>{player.run}</TableCell>
                <TableCell>{player.ball}</TableCell>
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
