import mongoose, { Schema, model } from "mongoose";
import type {
	MatchDocument,
	PlayerDocument,
	TeamDocument,
	LogDocument,
} from "./schemaTypes";

// Match Schema
const matchSchema = new Schema<MatchDocument>({
	matchId: { type: String, unique: true },
	teamA: { type: String, required: true },
	teamB: { type: String, required: true },
	currentOver: { type: Number, default: 0 },
	currentBall: { type: Number, default: 0 },
	bowler: { type: String },
	batStriker: { type: String },
	batNonStriker: { type: String },
	extras: { type: Number },
	winningTeam: { type: String, default: "" },
	oversPlayed: { type: Number, default: 0 }, //do not use
	ballsInCurrentOver: { type: Number, default: 0 },
	score: { type: Number, default: 0 },
});

// Player Schema
const playerSchema = new Schema<PlayerDocument>({
	teamName: { type: String, required: true },
	playerName: { type: String, required: true },
	runs: { type: Number, default: 0 },
	ballsPlayed: { type: Number, default: 0 },
	fours: { type: Number, default: 0 },
	sixes: { type: Number, default: 0 },
	wickets: { type: Number, default: 0 },
	oversBowled: { type: Number, default: 0 },
	runsGiven: { type: Number, default: 0 }, // Runs given while bowling (if bowler)
	isOut: { type: Boolean, default: false },
	battingPosition: { type: Number },
});

// Team Schema
const teamSchema = new Schema<TeamDocument>({
	matchId: { type: String, required: true },
	teamName: { type: String, required: true },
	totalRuns: { type: Number, default: 0 }, // dont use
	wicketsOut: { type: Number, default: 10 },
	totalWickets: { type: Number, default: 0 },
	totalOvers: { type: Number, default: 0 },
	players: [
		{
			name: { type: String, required: true }, // Player name
			isPlaying: { type: Boolean, default: true }, // If the player is currently playing
		},
	],
	extras: {
		wide: { type: Number, default: 0 },
		noBall: { type: Number, default: 0 },
		bye: { type: Number, default: 0 },
		legBye: { type: Number, default: 0 },
	},
	score: { type: Number, default: 0 },
	balls: { type: Number, default: 0 },
	overPlyed: { type: Number, default: 0 },
});

// Log Schema
const logSchema = new Schema<LogDocument>({
	matchId: { type: String, required: true },
	over: { type: Number }, // Over number
	ball: { type: Number }, // Ball number
	bowler: { type: String },
	batsman: { type: String },
	runs: { type: Number }, // Runs scored on that ball
	timestamp: { type: Date, default: Date.now }, // Timestamp for sorting
	wicket: { type: Boolean }, // If a wicket was taken
});

const Match = model("Match", matchSchema);
const Player = model("Player", playerSchema);
const Team = model("Team", teamSchema);
const Log = model("Log", logSchema);

export { Match, Log, Team, Player };
