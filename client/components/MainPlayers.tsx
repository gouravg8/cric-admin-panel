import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbArrowsExchange } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPlayerPlaying, playersState } from "@/states/state";

const MainPlayers = () => {
  const players = useRecoilValue(playersState);
  const [currentPlayerPlay, setCurrentPlayerPlay] =
    useRecoilState(currentPlayerPlaying);

  const [strikePlayer, setStrikePlayer] = useState("");
  const [nonStrikePlayer, setNonStrikePlayer] = useState("");
  const [bowlerPlayer, setBowlerPlayer] = useState("");

  const indianPlayerNames = players.indianPlayers.map(
    (player) => player.playerName
  );
  const pakistaniPlayerNames = players.pakistaniPlayers.map(
    (player) => player.playerName
  );

  const availablePlayers = indianPlayerNames.filter(
    (player) => player !== strikePlayer || player !== nonStrikePlayer
  );

  const changeStrikerAndNonStriker = () => {
    setNonStrikePlayer(strikePlayer);
    setStrikePlayer(nonStrikePlayer);
  };

  useEffect(() => {
    if (strikePlayer === nonStrikePlayer) {
      setStrikePlayer(availablePlayers[0]);
      setNonStrikePlayer(availablePlayers[1]);
    }
  }, [availablePlayers, nonStrikePlayer, strikePlayer]);

  useEffect(() => {
    setCurrentPlayerPlay({
      striker: strikePlayer,
      nonStriker: nonStrikePlayer,
      bowler: bowlerPlayer,
    });
  }, [bowlerPlayer, nonStrikePlayer, setCurrentPlayerPlay, strikePlayer]);

  return (
    <div className="flex w-full mx-auto items-center justify-around text-sm md:px-4">
      <div className="flex gap-4 items-center justify-between">
        <Select value={strikePlayer} onValueChange={setStrikePlayer}>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Player" />
          </SelectTrigger>
          <SelectContent>
            {availablePlayers.map((player: any) => (
              <SelectItem value={player} key={player}>
                {player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={changeStrikerAndNonStriker}>
          <TbArrowsExchange />
        </Button>

        <Select value={nonStrikePlayer} onValueChange={setNonStrikePlayer}>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Player" />
          </SelectTrigger>
          <SelectContent>
            {availablePlayers.map((player: any) => (
              <SelectItem value={player} key={player}>
                {player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select onValueChange={(value) => setBowlerPlayer(value)}>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Bowler" />
          </SelectTrigger>
          <SelectContent>
            {pakistaniPlayerNames.map((player: any) => (
              <SelectItem value={player} key={player}>
                {player}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MainPlayers;
