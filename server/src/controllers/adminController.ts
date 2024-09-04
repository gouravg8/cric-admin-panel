import type { Request, Response } from "express";
import { Match, Player, Team, Log } from "../db/schema";
import { indianPlayers, pakistaniPlayers } from "../db/initData";
import { Transform } from 'node:stream'

// import { io } from "../index";

async function getInitialData(req: Request, res: Response) {
	const { matchId } = req.params;
	res.header("Acccess-Control-Allow-Origin", "*");
	try {
		const players = await Player.find();
		const match = await Match.find({ matchId });
		const teams = await Team.find({ matchId });
		const logs = await Log.find({ matchId });
		res.status(200).json({
			message: "Data fetched successfully",
			data: { players, match, teams, logs },
		});
	} catch (error) {
		res.status(500).json({
			message: "Players not added",
			error: error,
		});
	}

}

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

async function getPlayers(req: Request, res: Response) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	try {
		const transformData = new Transform({
			objectMode: true,
			transform(chunk, encoding, callback) {
				if (!(this as any).isWritten) {
					(this as any).isWritten = true;
					callback(null, `[${JSON.stringify(chunk)}`);
				} else {
					callback(null, `,${JSON.stringify(chunk)}`);
				}
			},
			flush(callback) {
				callback(null, ']');
			}
		});

		(transformData as any).isWritten = false;

		const players = Player.find().cursor().pipe(transformData);
		players.pipe(res);
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

// async function normalRuns_Overthrow(req: Request, res: Response) {
// 	try {
// 		const {
// 			matchId,
// 			extraType,
// 			extraRun = 0,
// 			bowlerId,
// 			runs = 0,
// 			playerId,
// 			teamId,
// 			teamName,
// 		} = req.body;
// 		const batPlayer = await Player.findOneAndUpdate(
// 			{ _id: playerId },
// 			{ $inc: { haveRuns: runs + extraRun } },
// 			{ new: true },
// 		);
// 		const ballPlayer = await Player.findOneAndUpdate(
// 			{ _id: bowlerId },
// 			{ $inc: { giveRuns: runs + extraRun } },
// 			{ new: true },
// 		);
// 		const team = await Team.findOneAndUpdate(
// 			{ _id: teamId },
// 			{
// 				$inc: { score: runs, ball: 1 },
// 				$push: { extras: { title: extraType, value: extraRun } },
// 			},
// 			{ new: true },
// 		);
// 		const log = await Log.create({
// 			matchId,
// 			team: batPlayer?.teamName,
// 			teamName,
// 			ball: team ?? 0,
// 			over: Math.floor((team?.ball ?? 0) / 6),
// 			bowler: ballPlayer?.name,
// 			batsman: batPlayer?.name,
// 			runs,
// 			extras: [
// 				{
// 					title: extraType,
// 					value: extraRun,
// 				},
// 			],
// 		});

// 		res.status(200).json({
// 			data: { batPlayer, ballPlayer, team, log },
// 			message: "Runs updated successfully",
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			message: "Internal server error",
// 			error: error,
// 		});
// 	}
// }
async function normalRuns_Overthrow(req: Request, res: Response) {
	const { matchId, runs, bowlerName, batsmanName, extraRuns }: {
		matchId: string,
		runs: number,
		bowlerName: string,
		batsmanName: string,
		extraRuns: number,
	} = req.body;

	const totalRuns = runs + extraRuns;
	// Update match
	const match = await Match.findOneAndUpdate(
		{ matchId },
		{
			$inc: { score: totalRuns, currentBall: 1 },
			$set: { bowler: bowlerName, batStriker: batsmanName },
		}
	);

	// Update player stats
	await Player.findOneAndUpdate(
		{ matchId, playerName: batsmanName },
		{
			$inc: { runs: runs, ballsPlayed: 1 },
			$set: { isOut: false }
		}
	);

	// for bowler
	await Player.findOneAndUpdate(
		{ matchId, playerName: bowlerName },
		{ $inc: { runsGiven: runs, oversBowled: 0.1 } }
	);

	// Update team stats
	await Team.findOneAndUpdate(
		{ matchId, teamName: 'teamName' },
		{ $inc: { totalRuns: runs } }
	);

	// Log the delivery
	await Log.create({
		matchId,
		over: match?.oversPlayed,
		ball: match?.ballsInCurrentOver,
		bowler: bowlerName,
		batsman: batsmanName,
		runs,
	});
}



async function bye_ByeOverthrow_LegBy_LegByAndOverThrow(
	req: Request,
	res: Response,
) {
	try {
		const { extraRuns, playerId, bowlerId, teamId, matchId, extraType } =
			req.body;
		const match = await Match.findOne({ matchId });
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findById(bowlerId);
		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$inc: { score: extraRuns, ball: 1 },
				$push: { extras: { title: extraType, value: extraRuns } },
			},
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			over: match?.oversPlayed,
			ball: match?.ballsInCurrentOver,
			bowler: ballPlayer?.playerName,
			batsman: batPlayer?.playerName,
			runs: extraRuns,
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
		const match = await Match.findOne({ matchId });
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
			over: match?.oversPlayed,
			ball: match?.ballsInCurrentOver,
			bowler: ballPlayer?.playerName,
			batsman: batPlayer?.playerName,
			runs: extraRuns,
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
		const match = await Match.findOne({ matchId });
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
			over: match?.oversPlayed,
			ball: match?.ballsInCurrentOver,
			bowler: ballPlayer?.playerName,
			batsman: batPlayer?.playerName,
			runs: extraRuns,
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
		const { playerId, bowlerId, teamId, matchId, wickets } = req.body;
		const match = await Match.findOne({ matchId });
		const batPlayer = await Player.findById(playerId);
		const ballPlayer = await Player.findOneAndUpdate(
			{ _id: bowlerId },
			{ $inc: { haveWickets: 1 } },
			{ new: true },
		);

		const team = await Team.findOneAndUpdate(
			{ _id: teamId },
			{ $inc: { ball: 1, wickets: 1 } },
			{ new: true },
		);
		const log = await Log.create({
			matchId,
			over: match?.oversPlayed,
			ball: match?.ballsInCurrentOver,
			bowler: ballPlayer?.playerName,
			batsman: batPlayer?.playerName,
			wickets: 1,
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
export { getInitialData, getPlayers, init, adminController, createMatch, normalRuns_Overthrow, bye_ByeOverthrow_LegBy_LegByAndOverThrow, nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt, wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt, wicket };
