import mongoose, { Schema, model } from "mongoose";

// Match schema of cricket
const matchSchema = new Schema({
    matchId: String,
    teamsName: [String],
    score: Number,
    matchName: String,
    batStriker: String,
    batNonStriker: String,
    bower: String,
    winningTeam: String
});


// player schema
const playerSchema = new Schema({
    name: String,
    team: String,
    role: {
        type: String,
        enum: [
            "Batsman",
            "Bowler",
            "All Rounder",
            "Wicket Keeper",
            "Wicket Keeper Batsman",
        ],
    },
    isBatsman: Boolean,
    isBowler: Boolean,
    maiden: Number,
    haveRuns: Number,
    giveRuns: Number,
    haveFours: Number,
    haveSixes: Number,
    haveDotBalls: Number,
    haveWickets: Number,
    battingStyle: {
        type: String,
        enum: ["Right Hand Bat", "Left Hand Bat"],
    },
    bowlingStyle: {
        type: String,
        enum: [
            "Right Arm Fast",
            "Left Arm Fast",
            "Left Arm Spin",
            "Right Arm Spin",
            "Right Arm Medium",
            "Left Arm Medium",
            "Right Arm Off Spin",
            "Left Arm Off Spin",
        ],
    },
});


const teamSchema = new Schema({
    matchId: String,
    teamName: String,
    players: [String],
    score: Number,
    ball: Number,
    overs: Number,
    wickets: Number,
    totalOvers: Number,
    totalWickets: Number,
    extras: [{
        title: {
            type: String,
            enum: ["wd", "nb", "lb", "b", "p", "ot"],
        },
        value: Number,
    }]
})

// Log Schema
const logSchema = new Schema({
    matchId: String,
    teamName: String,
    log: [
        {
            matchId: String,
            team: String,
            date: {
                type: Date,
                default: Date.now(),
            },
            ball: Number,
            over: Number,
            ballByBall: String,
            bowler: String,
            batsman: String,
            nonStriker: String,
            runs: Number,
            wickets: Number,
            isDotBall: Boolean,
            isFour: Boolean,
            isSix: Boolean,
            isOut: Boolean,
            extras: [{
                title: {
                    type: String,
                    enum: ["wd", "nb", "lb", "b", "p", "ot"],
                },
                value: Number,
            }],
            isNoBall: Boolean,
            isWide: Boolean,
            isBye: Boolean,
            isLegBye: Boolean,
            isWicket: Boolean,
        },
    ],
});

const Match = model("Match", matchSchema);
const Player = model("Player", playerSchema);
const Team = model("Team", teamSchema);
const Log = model("Log", logSchema);

export { Match, Log, Team, Player };
