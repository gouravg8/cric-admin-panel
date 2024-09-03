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

const Commentry = () => {
  const PlayerScore = [
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 5 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 5.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
  ];
  return (
    <div className="w-full">
      <ScrollArea className="h-[220px] w-full rounded-md border p-4">
        <Table className="w-full">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Commentry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {PlayerScore.map((player) => (
              <TableRow key={player.batsman}>
                <TableCell className="flex items-center align-middle">
                  <div className="text-black text-xs bg-gray-200 rounded w-[30px] h-[20px] items-center text-center px-1 py-0.5 mr-4">
                    {player.over}
                  </div>
                  {player.bowler} to {player.batsman} : {player.run} runs
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Commentry;
