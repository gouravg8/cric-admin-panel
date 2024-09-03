import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbArrowsExchange } from "react-icons/tb";
import { Button } from "@/components/ui/button";

const MainPlayers = () => {
  return (
    <div className="flex w-full mx-auto items-center justify-around text-sm md:px-4">
      <div className="flex gap-4 items-center justify-between">
        <Select>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Player" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rohit">Rohit</SelectItem>
            <SelectItem value="kohli">Kohli</SelectItem>
            <SelectItem value="raina">Raina</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <TbArrowsExchange />
        </Button>
        <Select>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Player" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rohit">Rohit</SelectItem>
            <SelectItem value="kohli">Kohli</SelectItem>
            <SelectItem value="raina">Raina</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Bowler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bumrah">Bumrah</SelectItem>
            <SelectItem value="kuldeep">Kuldeep</SelectItem>
            <SelectItem value="jadeja">Jadeja</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MainPlayers;
