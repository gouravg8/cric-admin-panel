const findTypeOfBall = (typeAndValueRecoil: any) => {
    let getAllTypesOFBall: string[] = [];
    let totalRuns = 0;
    let fours = 0;
    let sixs = 0;
    let wicket = false;
    let typesOfBall: string = "";
    typeAndValueRecoil.forEach((item: any) => {
        if (item.extraType === "normal") {
            getAllTypesOFBall.push("normal");
            if (item.value === 4) {
                fours += 1;
            } else if (item.value === 6) {
                sixs += 1;
            }
            totalRuns += item.value;
            return
        }
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
            totalRuns += item.value;
        } else if (item.extraType === "byeoverthrow") {
            getAllTypesOFBall.push("byeoverthrow");
            totalRuns += item.value;
        } else if (item.extraType === "legoverthrow") {
            getAllTypesOFBall.push("legoverthrow");
            totalRuns += item.value;
        } else if (item.extraType === "wicket") {
            wicket = true;
        }
    });

    switch (getAllTypesOFBall[0]) {
        case "wide":
            typesOfBall = "wide";
            break;
        case "normal":
            typesOfBall = "normal";
            break;
        case "noball":
            typesOfBall = "noball";
            break;
        case "bye":
            typesOfBall = "bye";
            break;
        default:
            typesOfBall = "normal";
            break;
    }


    return [typesOfBall, totalRuns, wicket, fours, sixs];
};

export default findTypeOfBall;