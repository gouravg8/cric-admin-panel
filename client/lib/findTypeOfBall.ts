const findTypeOfBall = (typeAndValueRecoil: any) => {
    let getAllTypesOFBall: string[] = [];
    let totalRuns = 0;
    let wicket = false;
    let typesOfBall: string = "";
    typeAndValueRecoil.forEach((item: any) => {
        if (item.extraType === "wide") {
            getAllTypesOFBall.push("wide");
            totalRuns += 1;
        } else if (item.extraType === "noball") {
            getAllTypesOFBall.push("noball");
            totalRuns += 1;
        } else if (item.extraType === "bye") {
            getAllTypesOFBall.push("bye");
            totalRuns += 1;
        } else if (item.extraType === "legbye") {
            getAllTypesOFBall.push("legbye");
            totalRuns += 1;
        } else if (item.extraType === "overthrow") {
            getAllTypesOFBall.push("ovverthrow");
            totalRuns += 1;
        } else if (item.extraType === "byeoverthrow") {
            getAllTypesOFBall.push("byeoverthrow");
            totalRuns += 1;
        } else if (item.extraType === "legoverthrow") {
            getAllTypesOFBall.push("legoverthrow");
            totalRuns += 1;
        } else if (item.extraType === "normal") {
            getAllTypesOFBall.push("Normal");
            totalRuns += item.value;
        }
        if (item.extraType === "wicket") {
            wicket = true;
        }
    });

    const findBall = (inp: string) => {
        return getAllTypesOFBall.find((item) => item === inp)
    }
    if (findBall("wide")) typesOfBall = "wide";
    else if (findBall("normal")) typesOfBall = "normal";
    else if (findBall('bye')) typesOfBall = "bye";
    else if (findBall('noball')) typesOfBall = "noball";

    return [typesOfBall, totalRuns, wicket];
};

export default findTypeOfBall;