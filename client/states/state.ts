import { atom } from 'recoil';

const playersState = atom({
    key: 'playersState',
    default: { indianPlayers: [], pakistaniPlayers: [] }
})

const runBoardState = atom({
    key: 'runBoardState',
    default: { type: "", value: 0 }
})

const runBoardArea = atom({
    key: 'runBoardArea',
    default: [{
        type: "",
        value: 0
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
        },
        pakistan: {
            teamName: "Pakistan",
            score: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
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
        baller: "",
        batsman: "",
        runs: 0,
    }]
})