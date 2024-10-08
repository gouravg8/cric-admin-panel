import { atom } from 'recoil';

type playerType = {
    playerName: string; teamName: string;
}
const playersState = atom<{ indianPlayers: playerType[], pakistaniPlayers: playerType[] }>({
    key: 'playersState',
    default: { indianPlayers: [], pakistaniPlayers: [] }
})

const currentPlayerPlaying = atom({
    key: 'currentPlayerPlaying',
    default: { striker: "", nonStriker: "", bowler: "" }
})

const runBoardState = atom({
    key: 'runBoardState',
    default: [{ extraType: "", value: -1 }]
})

const runBoardArea = atom({
    key: 'runBoardArea',
    default: [{
        extraType: "",
        value: -1
    }]
})

const scoreBoardState = atom({
    key: 'scoreBoardState',
    default: {
        india: {
            teamName: "India",
            score: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            flag: ""
        },
        pakistan: {
            teamName: "Pakistan",
            score: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            flag: ""
        }
    }
})

const batsmanState = atom({
    key: 'batsmanState',
    default: [
        {
            name: "",
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
        }
    ]
})

const commentryState = atom({
    key: 'commentryState',
    default: [{
        over: 0.0,
        ball: 0,
        bowler: "",
        batsman: "",
        runs: 0,
    }]
})

export {
    playersState,
    runBoardState,
    currentPlayerPlaying,
    runBoardArea,
    scoreBoardState,
    batsmanState,
    commentryState
}