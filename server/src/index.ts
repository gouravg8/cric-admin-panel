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

const io = new Server(8000, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

const PORT = 8000;
// const MONGO_URI = process.env.MONGO_URI;


const app = express();
const server = http.createServer(app);

app.set("socket.io", io);
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

io.on('connection', async(socket: any) => {
	const players = await Player.find();
	socket.emit('players', players);
	console.log('a user connected', socket.id);
});

const match = Match.watch();
match.on('change', (data: any) => {
	console.log(data);
	io.emit('match', data);
});

const player = Player.watch();
player.on("init", (data: any) => {
	console.log(data);
	io.emit('init', data);
});
player.on('change', (data: any) => {
	console.log(data);
	io.emit('player', data);
});

const team = Team.watch();
team.on('change', (data: any) => {
	console.log(data);
	io.emit('team', data);
});

const log = Log.watch();
log.on('change', (data: any) => {
	console.log(data);
	io.emit('log', data);
});



app.get('/', (req: Request, res: Response) => {
	res.json({ msg: "66d7123f3b5af1c5d8bc4643" })
})
// API for admin-panel
app.get('/api/match/:matchId', getInitialData);
app.get("/api/admin/players", getPlayers);
app.post("/api/admin/init", init);
app.get("/api/admin", adminController);
app.post("/api/admin/normal-and-overthrow", normalRuns_Overthrow);
app.post("/api/admin/bye-and-extra", bye_ByeOverthrow_LegBy_LegByAndOverThrow);
app.post("/api/admin/noBall-and-extra", nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt);
app.post("/api/admin/wide-and-extra", wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt);
app.post("/api/admin/wicket", wicket);
app.post("/api/admin/match", createMatch)

// API for all invalid routes
app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: "Invalid route",
	});
});