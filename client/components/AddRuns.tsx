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

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";

const AddRuns = () => {
  const typesOfBall = [
    { label: "Normal", value: "normal" },
    { label: "Wide", value: "wide" },
    { label: "No Ball", value: "noball" },
    { label: "Bye", value: "bye" },
  ];

  const typesOfExtra = [
    { label: "Over Throw", value: "overthrow" },
    { label: "Leg Bye", value: "legbye" },
    { label: "Bye", value: "bye" },
    { label: "Bye Overthrow", value: "byeoverthrow" },
    { label: "Leg Bye Overthrow", value: "legoverthrow" },
  ];

  const runs = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "6", value: "6" },
  ];
  return (
    <div className="w-10/12 px-4 mx-32 py-8 flex items-start justify-around border rounded-lg">
      {/* <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Extras</TableHead>
            <TableHead>Runs</TableHead>
            <TableHead className="text-right">Add</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Normal</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}

      <ToggleGroup type="single" className="flex flex-col gap-4">
        <h2 className="text-gray-400">Types</h2>
        {typesOfBall.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup type="single" className="flex flex-col gap-4">
        <h2 className="text-gray-400">Extras</h2>
        {typesOfExtra.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup type="single" className="flex flex-col gap-2">
        <h2 className="text-gray-400">Runs</h2>
        {runs.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Button className="items-center my-auto">Add</Button>
    </div>
  );
};

export default AddRuns;
