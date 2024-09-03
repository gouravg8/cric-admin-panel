import mongoose, { Schema, model } from "mongoose";

// Match schema of cricket
const matchSchema = new Schema({
	matchId: String,
	teamA: String,
	teamB: String,
	score: {
		type: Number,
		default: 0,
	},
	matchName: String,
	batStriker: String,
	batNonStriker: String,
	bowler: String,
	winningTeam: String,
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
	maiden: {
		type: Number,
		default: 0,
	},
	haveRuns: {
		type: Number,
		default: 0,
	},
	giveRuns: {
		type: Number,
		default: 0,
	},
	haveFours: {
		type: Number,
		default: 0,
	},
	haveSixes: {
		type: Number,
		default: 0,
	},
	haveDotBalls: {
		type: Number,
		default: 0,
	},
	haveWickets: {
		type: Number,
		default: 0,
	},
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
	score: {
		type: Number,
		default: 0,
	},
	ball: {
		type: Number,
		default: 0,
	},
	overs: {
		type: Number,
		default: 0,
	},
	wickets: {
		type: Number,
		default: 0,
	},
	totalOvers: {
		type: Number,
		default: 0,
	},
	totalWickets: {
		type: Number,
		default: 0,
	},
	extras: [
		{
			title: {
				type: String,
				enum: ["wd", "nb", "lb", "b", "p", "ot"],
			},
			value: Number,
		},
	],
});

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
			ball: {
				type: Number,
				default: 0,
			},
			over: {
				type: Number,
				default: 0,
			},
			ballByBall: String,
			bowler: String,
			batsman: String,
			nonStriker: String,
			runs: {
				type: Number,
				default: 0,
			},
			wickets: {
				type: Number,
				default: 0,
			},
			wicketType: {
				type: String,
				enum: ["c", "b", "st", "ro", "p"],
			},
			isDotBall: Boolean,
			isFour: Boolean,
			isSix: Boolean,
			isOut: Boolean,
			extras: [
				{
					title: {
						type: String,
						enum: ["wd", "nb", "lb", "b", "p", "ot"],
					},
					value: Number,
				},
			],
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
