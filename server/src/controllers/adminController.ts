import { Request, Response } from "express";
import { Match, Player, Team, Log } from "../db/schema";

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

async function normalRuns_Overthrow(req: Request, res: Response) {
    try {
        const { runs, playerId, bowlerId, teamId, matchId, teamName } = req.body;
        const batPlayer = await Player.findOneAndUpdate(
            { _id: playerId },
            { $inc: { haveRuns: runs } },
            { new: true }
        );
        const ballPlayer = await Player.findOneAndUpdate(
            { _id: bowlerId },
            { $inc: { giveRuns: runs } },
            { new: true }
        );
        const team = await Team.findOneAndUpdate(
            { _id: teamId },
            { $inc: { score: runs, ball: 1 } },
            { new: true }
        );
        const log = await Log.create({
            matchId,
            team: batPlayer?.team,
            teamName,
            ball: team?.ball ?? 0,
            over: Math.floor((team?.ball ?? 0) / 6),
            bowler: ballPlayer?.name,
            batsman: batPlayer?.name,
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

async function bye_ByeOverthrow_LegBy_LegByAndOverThrow(req: Request, res: Response) {
    try {
        const { runs, playerId, bowlerId, teamId, matchId, extraType } = req.body;
        const batPlayer = await Player.findOneAndUpdate({ _id: playerId }, { $inc: { haveRuns: runs } }, { new: true });
        const ballPlayer = await Player.findOneAndUpdate({ _id: bowlerId }, { $inc: { giveRuns: runs } }, { new: true });
        const team = await Team.findOneAndUpdate({ _id: teamId }, { $inc: { score: runs, ball: 1 }, $push: { extras: { title: extraType, value: runs } } }, { new: true });
        const log = await Log.create({
            matchId,
            team: batPlayer?.team,
            ball: team?.ball ?? 0,
            over: Math.floor((team?.ball ?? 0) / 6),
            bowler: ballPlayer?.name,
            batsman: batPlayer?.name,
            extras: [{ title: extraType, value: runs }],
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
export { adminController };