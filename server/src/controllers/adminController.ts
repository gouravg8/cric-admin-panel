import type { Request, Response } from "express";
import { Match, Player, Team, Log } from "../db/schema";
import { indianPlayers, pakistaniPlayers } from "../db/initData";

async function init(req: Request, res: Response) {
	try {
		const players = await Player.find();
		if (players.length === 0) {
			const indianPlayersAdd = await Player.insertMany(indianPlayers);
			const pakistaniPlayersAdd = await Player.insertMany(pakistaniPlayers);
			res.json({
				message: "Players added successfully",
				players: [...indianPlayersAdd, ...pakistaniPlayersAdd],
			});
		} else {
			res.status(200).json({
				message: "Players already added",
				players
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Players not added",
			error: error,
		});
	}
}



async function adminController(req: Request, res: Response) {
	try {
		// Get all matches
		const matches = await Match.find();
		res.status(200).json({
			message: "Matches fetched successfully",
			data: matches,
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal server error",
			error: err,
		});
	}
}

async function createMatch(req: Request, res: Response) {
	try {
		const { matchId, teamA, teamB, matchName, batStriker, batNonStriker, bowler, winningTeam } = req.body;
		const match = await Match.create({
			matchId,
			teamA,
			teamB,
			matchName,
			batStriker,
			batNonStriker,
			bowler,
			winningTeam,
		});
		res.status(200).json({
			message: "Match created successfully",
			data: match,
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal server error",
			error: err,
		});
	}

}

async function normalRuns_Overthrow(req: Request, res: Response) {
	try {
		const {
			runs = 0,
			playerId,
			bowlerId,
			teamId,
			matchId,
			teamName,
			extraType,
			extraRun = 0,
		} = req.body;
		const batPlayer = await Player.findOneAndUpdate(
			{ _id: playerId },
			{ $inc: { haveRuns: runs + extraRun } },
			{ new: true },
		);
		const ballPlayer = await Player.findOneAndUpdate(
			{ _id: bowlerId },
			{ $inc: { giveRuns: runs + extraRun } },
			{ new: true },
		);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$inc: { score: runs, ball: 1 },
				$push: { extras: { title: extraType, value: extraRun } },
			},
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			team: batPlayer?.team,
			teamName,
			ball: team?.ball ?? 0,
			over: Math.floor((team?.ball ?? 0) / 6),
			bowler: ballPlayer?.name,
			batsman: batPlayer?.name,
			runs,
			extras: [
				{
					title: extraType,
					value: extraRun,
				},
			],
		});

		res.status(200).json({
			data: { batPlayer, ballPlayer, team, log },
			message: "Runs updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error,
		});
	}
}

async function bye_ByeOverthrow_LegBy_LegByAndOverThrow(
	req: Request,
	res: Response,
) {
	try {
		const { extraRun, playerId, bowlerId, teamId, matchId, extraType } =
			req.body;
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findById(bowlerId);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$inc: { score: extraRun, ball: 1 },
				$push: { extras: { title: extraType, value: extraRun } },
			},
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			team: team?.teamName,
			ball: team?.ball ?? 0,
			over: Math.floor((team?.ball ?? 0) / 6),
			bowler: ballPlayer?.name,
			batsman: batPlayer?.name,
			extras: [{ title: extraType, value: extraRun }],
		});
		res.status(200).json({
			data: { batPlayer, ballPlayer, team, log },
			message: "Runs updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error,
		});
	}
}

async function nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt(
	req: Request,
	res: Response,
) {
	try {
		const { playerId, bowlerId, teamId, matchId, extras, extraRuns } = req.body;
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findOneAndUpdate(
			{ _id: bowlerId },
			{ $inc: { giveRuns: extraRuns } },
			{ new: true },
		);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{ $inc: { score: extraRuns }, $push: { extras } },
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			team: team?.teamName,
			ball: team?.ball ?? 0,
			over: Math.floor((team?.ball ?? 0) / 6),
			bowler: ballPlayer?.name,
			batsman: batPlayer?.name,
			extras,
		});
		res.status(200).json({
			data: { batPlayer, ballPlayer, team, log },
			message: "Runs updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error,
		});
	}
}

async function wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt(
	req: Request,
	res: Response,
) {
	try {
		const { playerId, bowlerId, teamId, matchId, extras, extraRuns } = req.body;
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findOneAndUpdate(
			{ _id: bowlerId },
			{ $inc: { giveRuns: extraRuns } },
			{ new: true },
		);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{ $inc: { score: extraRuns }, $push: { extras } },
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			team: team?.teamName,
			ball: team?.ball ?? 0,
			over: Math.floor((team?.ball ?? 0) / 6),
			bowler: ballPlayer?.name,
			batsman: batPlayer?.name,
			extras,
		});
		res.status(200).json({
			data: { batPlayer, ballPlayer, team, log },
			message: "Runs updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error,
		});
	}
}

async function wicket(req: Request, res: Response) {
	try {
		const { playerId, bowlerId, teamId, matchId, wicketType } = req.body;
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findOneAndUpdate(
			{ _id: bowlerId },
			{ $inc: { haveWickets: 1 } },
			{ new: true },
		);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{ $inc: { ball: 1 } },
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			team: team?.teamName,
			ball: team?.ball ?? 0,
			over: Math.floor((team?.ball ?? 0) / 6),
			bowler: ballPlayer?.name,
			batsman: batPlayer?.name,
			wicketType,
		});
		res.status(200).json({
			data: { batPlayer, ballPlayer, team, log },
			message: "Runs updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error,
		});
	}
}
export { init, adminController, createMatch, normalRuns_Overthrow, bye_ByeOverthrow_LegBy_LegByAndOverThrow, nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt, wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt, wicket };
