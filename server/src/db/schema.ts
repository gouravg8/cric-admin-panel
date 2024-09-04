import mongoose, { Schema, model } from "mongoose";
import { MatchDocument, PlayerDocument, TeamDocument, LogDocument } from "./schemaTypes";

// Match Schema
const matchSchema = new Schema<MatchDocument>({
	matchId: { type: String, unique: true }, // Unique identifier for the match
	teamA: { type: String, required: true }, // Name of Team A
	teamB: { type: String, required: true }, // Name of Team B
	currentOver: { type: Number, default: 0 }, // Current over in the match
	currentBall: { type: Number, default: 0 }, // Current ball in the over
	bowler: { type: String }, // Name of the current bowler
	batStriker: { type: String }, // Name of the current batsman
	batNonStriker: { type: String },
	extras: { type: Number },
	winningTeam: { type: String, default: "" }, // Winning team, if the match is completed
	oversPlayed: { type: Number, default: 0 },
	ballsInCurrentOver: { type: Number, default: 0 },
	score: { type: Number, default: 0 }
});



// Player Schema
const playerSchema = new Schema<PlayerDocument>({
	matchId: { type: String, required: true }, // Reference to the match
	teamName: { type: String, required: true }, // Reference to the team
	playerName: { type: String, required: true }, // Name of the player
	runs: { type: Number, default: 0 }, // Runs scored by the player
	ballsPlayed: { type: Number, default: 0 }, // Balls faced by the player
	fours: { type: Number, default: 0 }, // Number of fours hit
	sixes: { type: Number, default: 0 }, // Number of sixes hit
	wickets: { type: Number, default: 0 }, // Number of wickets taken (if bowler)
	oversBowled: { type: Number, default: 0 }, // Overs bowled (if bowler)
	runsGiven: { type: Number, default: 0 }, // Runs given while bowling (if bowler)
	isOut: { type: Boolean, default: false }, // If the player is out
	battingPosition: { type: Number }, // Batting position of the player
});


// Team Schema
const teamSchema = new Schema<TeamDocument>({
	matchId: { type: String, required: true }, // Unique ID for each match
	teamName: { type: String, required: true }, // Name of the team (e.g., India, Pakistan)
	totalRuns: { type: Number, default: 0 }, // Total runs scored by the team
	totalWickets: { type: Number, default: 0 }, // Total wickets lost by the team
	totalOvers: { type: Number, default: 0 }, // Overs played by the team
	players: [
		{
			name: { type: String, required: true }, // Player name
			isPlaying: { type: Boolean, default: true }, // If the player is currently playing
		}
	],
	extras: {
		wide: { type: Number, default: 0 },
		noBall: { type: Number, default: 0 },
		bye: { type: Number, default: 0 },
		legBye: { type: Number, default: 0 },
	},
	score: { type: Number, default: 0 },
});

// Log Schema
const logSchema = new Schema<LogDocument>({
	matchId: { type: String, required: true }, // Reference to the match
	over: { type: Number }, // Over number
	ball: { type: Number }, // Ball number
	bowler: { type: String }, // Bowler name
	batsman: { type: String }, // Batsman name
	runs: { type: Number }, // Runs scored on that ball
	timestamp: { type: Date, default: Date.now }, // Timestamp for sorting
});


const Match = model("Match", matchSchema);
const Player = model("Player", playerSchema);
const Team = model("Team", teamSchema);
const Log = model("Log", logSchema);

export { Match, Log, Team, Player };
