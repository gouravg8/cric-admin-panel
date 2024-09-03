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
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
    { batsman: "rohit", bowler: "malinga", run: 34, over: 10.3 },
  ];
  return (
    <div className="w-full">
      <ScrollArea className="h-[215px] w-full rounded-md border p-4">
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
                <TableCell>
                  <span className="text-gray-200 bg-gray-900 rounded-full w-full px-1 py-2 items-center mt-6 mx-4">
                    {player.over}
                  </span>
                  {player.batsman} to {player.batsman} : {player.run} runs
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
