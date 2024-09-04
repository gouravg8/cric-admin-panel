"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { currentPlayerPlaying, runBoardState } from "@/states/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const FormSchema = z.object({
  areaData: z.string().min(10, {
    message: "Data must be at least 10 characters.",
  }),
});

function RunsArea() {
  const [runBoardArea, setRunBoardArea] = useState<any>([]);

  const [typeAndValueRecoil, setTypeAndValueRecoil] =
    useRecoilState(runBoardState);
  const currentPlayerPlay = useRecoilValue(currentPlayerPlaying);

  function onSubmit(e: any) {
    e.preventDefault();
    if (
      currentPlayerPlay.striker === "" ||
      currentPlayerPlay.nonStriker === "" ||
      currentPlayerPlay.bowler === ""
    ) {
      alert("Please select a player to play");
      return;
    }
    console.log(runBoardArea);
    setRunBoardArea([]);
    setTypeAndValueRecoil([
      {
        extraType: "",
        value: -1,
      },
    ]);
  }

  useEffect(() => {
    let filteredData = typeAndValueRecoil.filter(
      (item: any) => item.extraType !== "" && item.value !== -1
    );
    setRunBoardArea(filteredData);
  }, [typeAndValueRecoil]);

  return (
    <div className="w-10/12 space-y-6 items-center">
      {runBoardArea.length > 0 ? (
        <div className="flex border gap-3 rounded p-4">
          {runBoardArea.map((item: { extraType: string; value: number }) => {
            return (
              <div
                key={Math.random() * 100}
                className="w-fit flex gap-3 text-black bg-gray-200 p-2 rounded"
              >
                <span className="text-xs">
                  {item.extraType}:{item.value}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex border gap-3 rounded p-8 text-zinc-400">
          <p>Runs will be shown over here</p>
        </div>
      )}

      <Button onClick={onSubmit} type="submit" className="float-right w-full">
        Submit
      </Button>
    </div>
  );
}
export default RunsArea;
