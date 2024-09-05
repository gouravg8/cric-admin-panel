import React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";
import { useSetRecoilState } from "recoil";
import { runBoardState } from "@/states/state";

type typeAndValueType = {
  extraType: string;
  value: number;
};

const AddRuns = () => {
  const [typeAndValue, setTypeAndValue] = React.useState<typeAndValueType>({
    extraType: "",
    value: 0,
  });

  const setTypeAndValueRecoil = useSetRecoilState(runBoardState);

  const typesOfBall = [
    { label: "Normal", value: "normal" },
    { label: "Wide", value: "wide" },
    { label: "No Ball", value: "noball" },
    { label: "Bye", value: "bye" },
    { label: "Wicket", value: "wicket" },
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

  const handleTypeChange = (
    value: string,
    types: { label: string; value: string }[]
  ) => {
    const selectedType = types.find((type) => type.value === value);
    if (selectedType) {
      setTypeAndValue((prev) => ({
        ...prev,
        extraType: selectedType.value,
      }));
    }
  };

  const handleRunChange = (value: string) => {
    setTypeAndValue((prev) => ({
      ...prev,
      value: parseInt(value, 10),
    }));
  };

  const addRunsToArea = () => {
    if (
      typeAndValue.extraType !== "wicket" &&
      (typeAndValue.extraType === "" || typeAndValue.value === -1)
    ) {
      alert("Please select a type of ball and value");
      return;
    } else {
      setTypeAndValueRecoil((prev) => [...prev, typeAndValue]);
    }

    setTypeAndValue({
      extraType: "",
      value: -1,
    });
  };

  return (
    <div className="w-10/12 px-4 mx-32 py-8 flex items-start justify-around border rounded-lg">
      <ToggleGroup
        type="single"
        className="flex flex-col gap-4"
        onValueChange={(value) => handleTypeChange(value, typesOfBall)}
        value={typeAndValue.extraType}
      >
        <h2 className="text-gray-400">Types</h2>
        {typesOfBall.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        className="flex flex-col gap-4"
        onValueChange={(value) => handleTypeChange(value, typesOfExtra)}
        value={typeAndValue.extraType}
      >
        <h2 className="text-gray-400">Extras</h2>
        {typesOfExtra.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        className="flex flex-col gap-4"
        onValueChange={handleRunChange}
        value={typeAndValue.value.toString()}
      >
        <h2 className="text-gray-400">Runs</h2>
        {runs.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Button onClick={addRunsToArea} className="items-center my-auto">
        Add
      </Button>
    </div>
  );
};
export default AddRuns;
