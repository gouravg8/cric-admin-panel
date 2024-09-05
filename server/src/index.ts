import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getPlayers, adminController, bye_ByeOverthrow_LegBy_LegByAndOverThrow, createMatch, init, nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt, normalRuns_Overthrow, wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt, wicket, getInitialData } from "./controllers/adminController";
import dbConnect from "./db/dbConnect";
import http from "node:http";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import { Log, Match, Player, Team } from "./db/schema";

import { Server } from 'socket.io';


const PORT = 8000;
// const MONGO_URI = process.env.MONGO_URI;


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"]
	}
});

app.use(cors());
app.set("socket.io", io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

let i = 1;
const connectedSockets = new Map();


io.on('connection', async (socket) => {
	connectedSockets.set(socket.id, socket);
	console.log('A user connected', connectedSockets.size);

	// get all player and send to frontend
	const players = await Player.find();

	const team = await Team.find({ teamName: "India" });
	const batPlayerOut = await Player.find({ teamName: players[0]?.teamName, runs: { $gte: 1 } });
	const commentry = await Log.find({ matchId: team[0].matchId }).sort({ timestamp: -1 });

	io.emit('players', [players, team, batPlayerOut, commentry]);


	socket.on('disconnect', () => {
		connectedSockets.delete(socket.id);
		console.log('A user disconnected', connectedSockets.size);
	});

	socket.on("normal_and_overthrow", async (data) => {
		const result = await normalRuns_Overthrow(data);
		io.emit('normalRuns_Overthrow_update', result);
	});

	socket.on("bye_and_extra", async (data) => {
		const result = await bye_ByeOverthrow_LegBy_LegByAndOverThrow(data);
		io.emit('bye_extra_update', result);
	});

	socket.on("noball_and_extra", async (data) => {
		const result = await nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt(data);
		io.emit('noball_extra_update', result);
	});
	socket.on("wide_and_extra", async (data) => {
		const result = await wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt(data);
		io.emit('wide_extra_update', result);
	});

	socket.on("wicket", async (data) => {
		const result = await wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt(data);
		io.emit('wicket_update', result);
	});



});


// const connection = mongoose.connection;
// connection.once("open", () => {
// 	console.log("MongoDB database connection established successfully!");

// 	const matchStream = connection.collection("matches").watch();

// });


// app.get('/', (req: Request, res: Response) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.json({ msg: "66d7123f3b5af1c5d8bc4643" })
// })

app.post("/api/admin/normal-and-overthrow", async (req: Request, res: Response) => {
	res.header("Access-Control-Allow-Origin", "*");
	// try {
	// 	// const result = await normalRuns_Overthrow(req.body);
	// 	// const io = req.app.get('socket.io');
	// 	io.emit('normalRuns_Overthrow_update', "result");
	// 	res.json({ result: "success from normal" });
	// } catch (error) {
	// 	console.error('Error in normalRuns_Overthrow:', error);
	// 	res.status(500).json({ message: 'An error occurred during normalRuns_Overthrow' });
	// }
	res.json({ msg: "hi from normal" });
});
// API for admin-panel
// app.get('/api/match/:matchId', getInitialData);
// app.get("/api/admin/players", getPlayers);
// app.post("/api/admin/init/:matchId", init);
// app.get("/api/admin", adminController);
// app.post("/api/admin/normal-and-overthrow", normalRuns_Overthrow);
// app.post("/api/admin/bye-and-extra", bye_ByeOverthrow_LegBy_LegByAndOverThrow);
// app.post("/api/admin/noBall-and-extra", nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt);
// app.post("/api/admin/wide-and-extra", wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt);
// app.post("/api/admin/wicket", wicket);
// app.post("/api/admin/match", createMatch)

// API for all invalid routes
app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: "Invalid route",
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});