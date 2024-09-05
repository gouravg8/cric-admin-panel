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

		}


		const match = await Match.find({ _id: req.params.matchId });
		if (match.length === 0) {
			const match = await Match.create({
				matchId: req.params.matchId,
				teamA: 'India',
				teamB: 'Pakistan',
				currentOver: 0,
				currentBall: 0,
				bowler: '',
				batStriker: '',
				nonStriker: '',
				extras: 0,
				winningTeam: '',
				oversPlayed: 0,
				ballsInCurrentOver: 0,
				score: 0,
			});
		}

		const team = await Team.find({ matchId: req.params.matchId });
		if (team.length === 0) {
			const team = await Team.create({
				matchId: req.params.matchId,
				teamName: 'India',
				totalRuns: 0,
				wicketsOut: 10,
				totalWickets: 10,
				totalOvers: 20,
				players: [],
				extras: {
					wide: 0,
					noBall: 0,
					legBye: 0,
					bye: 0,
					penalty: 0,
					extraRuns: 0,
				},
				score: 0,
				balls: 0,
				overPlyed: 0,
			})

		}
		res.json({
			message: "player and match created successfully",
			players, match, team,
		});
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


type NormalRunsOverthrow = {
	matchId: string;
	runs: number;
	bowlerName: string;
	batsmanName: string;
	extraRuns: number;
	fours: number;
	sixs: number
};

async function normalRuns_Overthrow({ matchId, runs, bowlerName, batsmanName, extraRuns = 0, fours, sixs }: NormalRunsOverthrow) {

	const totalRuns = runs + extraRuns;

	// Update match
	const match = await Match.findOne({ matchId });
	if (!match) {
		throw new Error('Match not found');
	}
	if (match.ballsInCurrentOver === 6) {
		match.currentOver += 1;
		match.ballsInCurrentOver = 0;
		match.bowler = bowlerName;
		match.batStriker = batsmanName;
		await match.save();
	}
	if (match.ballsInCurrentOver < 6) {
		match.ballsInCurrentOver += 1;
		await match.save();
	}


	// Update player stats
	const batPlayer = await Player.findOneAndUpdate(
		{ playerName: batsmanName },
		{
			$inc: { runs: totalRuns, ballsPlayed: 1, fours, sixs },
			$set: { isOut: false }
		}, { new: true }
	);

	const batPlayerOut = await Player.find({ teamName: batPlayer?.teamName, runs: { $gte: 1 } });

	// for bowler
	const bowlerPlayer = await Player.findOneAndUpdate(
		{ playerName: bowlerName },
		{ $inc: { runsGiven: totalRuns, oversBowled: 0.1 } }, {
		new: true,
	});

	// Update team stats
	const team = await Team.findOneAndUpdate(
		{ matchId, teamName: batPlayer?.teamName },
		{ $inc: { score: totalRuns, balls: 1 } }, { new: true }
	);

	// Log the delivery
	const oldLog = await Log.create({
		matchId,
		over: match?.currentOver,
		ball: match?.ballsInCurrentOver,
		bowler: bowlerName,
		batsman: batsmanName,
		runs,
	});
	const log = await Log.find({ matchId }).sort({ timestamp: -1 })
	return { match, batPlayer, batPlayerOut, bowlerPlayer, team, log }
}


type ByeByeOverthrowLegByLegByAndOverThrow = {
	matchId: string;
	bowlerName: string;
	extraType: string;
	extraRuns: number;
	teamName: string;
	batsmanName: string;
};
async function bye_ByeOverthrow_LegBy_LegByAndOverThrow(
	{ extraRuns, batsmanName, bowlerName, matchId, extraType }: ByeByeOverthrowLegByLegByAndOverThrow
) {
	try {

		const match = await Match.findOne({ matchId });
		if (!match) {
			throw new Error('Match not found');
		}
		if (match.ballsInCurrentOver === 6) {
			match.currentOver += 1;
			match.ballsInCurrentOver = 0;
			match.bowler = bowlerName;
			match.batStriker = batsmanName;
			await match.save();
		}
		if (match.ballsInCurrentOver < 6) {
			match.ballsInCurrentOver += 1;
			await match.save();
		}

		const batPlayer = await Player.findOne({ playerName: batsmanName })
		const ballPlayer = await Player.find({ playerName: bowlerName })

		const batPlayerOut = await Player.find({ teamName: batPlayer?.teamName, runs: { $gte: 1 } });


		const teamOld = await Team.findOneAndUpdate(
			{ teamName: batPlayer?.teamName },
			{
				$inc: { score: extraRuns, ball: 1 }, extras: { $inc: { bye: extraRuns } },
			},
			{ new: true },
		);


		// Log the delivery
		const oldLog = await Log.create({
			matchId,
			over: match?.currentOver,
			ball: match?.ballsInCurrentOver,
			bowler: bowlerName,
			batsman: batsmanName,
			runs: extraRuns,
		});

		const log = await Log.find({ matchId }).sort({ timestamp: -1 })

		const team = await Team.findOne({ teamName: batPlayer?.teamName });
		return { match, batPlayer, batPlayerOut, ballPlayer, team, log }
	} catch (error) {
		console.log(error);
	}
}

type Nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt = {
	matchId: string;
	extraRuns: number;
	bowlerName: string;
	batsmanName: string;
	extraType: string;
};

async function nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt(
	{ extraRuns, batsmanName, bowlerName, matchId, extraType }: Nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt
) {
	try {
		const match = await Match.findOne({ matchId });

		const batPlayer = await Player.findOne({ playerName: batsmanName });
		const ballPlayer = await Player.findOneAndUpdate(
			{ playerName: bowlerName },
			{ $inc: { giveRuns: extraRuns } },
			{ new: true },
		);
		const batPlayerOut = await Player.find({ teamName: batPlayer?.teamName, runs: { $gte: 1 } });

		const teamOld = await Team.findOneAndUpdate(
			{ teamName: batPlayer?.teamName },
			{ $inc: { score: extraRuns, }, extras: { $inc: { noBall: 1 } } },
			{ new: true },
		);
		// Log the delivery
		const oldLog = await Log.create({
			matchId,
			over: match?.currentOver,
			ball: match?.ballsInCurrentOver,
			bowler: bowlerName,
			batsman: batsmanName,
			runs: extraRuns,
		});
		const log = await Log.find({ matchId }).sort({ timestamp: -1 })

		const team = await Team.findOne({ teamName: batPlayer?.teamName })
		return { match, batPlayer, batPlayerOut, ballPlayer, team, log }
	} catch (error) {
		console.log(error);
	}
}

type Wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt = {
	matchId: string;
	bowlerName: string;
	batsmanName: string;
	extraRuns: number;
	extraType: string;
};
async function wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt(
	{ matchId, extraRuns, extraType, batsmanName, bowlerName, }: Wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt
) {
	try {
		const match = await Match.findOne({ matchId });
		if (!match) {
			throw new Error('Match not found');
		}
		if (match.ballsInCurrentOver === 6) {
			match.currentOver += 1;
			match.ballsInCurrentOver = 0;
			match.bowler = bowlerName;
			match.batStriker = batsmanName;
			await match.save();
		}
		if (match.ballsInCurrentOver < 6) {
			match.ballsInCurrentOver += 1;
			await match.save();
		}

		const batPlayer = await Player.findOne({ playerName: batsmanName });
		const batPlayerOut = await Player.find({ teamName: batPlayer?.teamName, runs: { $gte: 1 } });

		const ballPlayer = await Player.findOneAndUpdate(
			{ playerName: bowlerName },
			{ $inc: { giveRuns: extraRuns } },
			{ new: true },
		);
		const teamOld = await Team.findOneAndUpdate(
			{ teamName: batPlayer?.teamName },
			{ $inc: { score: extraRuns }, extras: { $inc: { wide: 1 } } },
			{ new: true },
		);

		// Log the delivery
		const olgLog = await Log.create({
			matchId,
			over: match?.currentOver,
			ball: match?.ballsInCurrentOver,
			bowler: bowlerName,
			batsman: batsmanName,
			runs: extraRuns,
		});
		const log = await Log.find({ matchId }).sort({ timestamp: -1 })

		const team = await Team.findOne({ teamName: batPlayer?.teamName })
		return { match, batPlayer, batPlayerOut, ballPlayer, team, log }
	} catch (error) {
		console.log(error);
	}
}

type WicketType = {
	wicket: boolean;
	batsmanName: string;
	bowlerName: string;
	matchId: string;
};
async function wicket({ wicket, batsmanName, bowlerName, matchId }: WicketType) {
	try {
		const match = await Match.findOne({ matchId });
		if (!match) {
			throw new Error('Match not found');
		}
		if (match.ballsInCurrentOver === 6) {
			match.currentOver += 1;
			match.ballsInCurrentOver = 0;
			match.bowler = bowlerName;
			match.batStriker = batsmanName;
			await match.save();
		}
		if (match.ballsInCurrentOver < 6) {
			match.ballsInCurrentOver += 1;
			await match.save();
		}

		const batPlayer = await Player.findOne({ playerName: batsmanName });
		const batPlayerOut = await Player.find({ teamName: batPlayer?.teamName, runs: { $gte: 1 } });

		const ballPlayer = await Player.findOneAndUpdate(
			{ playerName: bowlerName },
			{ $inc: { haveWickets: 1 } },
			{ new: true },
		);

		const team = await Team.findOneAndUpdate(
			{ teamName: batPlayer?.teamName },
			{ $inc: { ball: 1, wicketsOut: 1 } },
			{ new: true },
		);

		// Log the delivery
		const oldLog = await Log.create({
			matchId,
			over: match.currentOver,
			ball: match.ballsInCurrentOver,
			bowler: bowlerName,
			batsman: batsmanName,
			wicket: true,
			runs: 0,
		});
		const log = await Log.find({ matchId }).sort({ timestamp: -1 })

		return { match, batPlayer, batPlayerOut, ballPlayer, team, log }
	} catch (error) {
		console.log(error);
	}
} export { getInitialData, getPlayers, init, adminController, createMatch, normalRuns_Overthrow, bye_ByeOverthrow_LegBy_LegByAndOverThrow, nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt, wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt, wicket };
