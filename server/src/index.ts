import express, { type Request, type Response } from "express";
import mongoose, { connect } from "mongoose";
import { Match, Player, Log } from "./db/schema";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { adminController, bye_ByeOverthrow_LegBy_LegByAndOverThrow, createMatch, init, nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt, normalRuns_Overthrow, wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt, wicket } from "./controllers/adminController";
dotenv.config();

const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
if (MONGO_URI) {
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((err) => {
			console.log(err);
		});
}

// API for admin-panel
app.post("/api/admin/init", init);
app.get("/api/admin", adminController);
app.post("/api/admin/normal-and-overthrow", normalRuns_Overthrow);
app.post("/api/admin/bye-and-extra", bye_ByeOverthrow_LegBy_LegByAndOverThrow);
app.post("/api/admin/notBye-and-extra", nb_nbOt_nbBye_nbByeOt_nbLbye_nbLbyeOt);
app.post("/api/admin/wide-and-extra", wd_wdOt_wdBye_wdByeOt_wdLbye_wdLbyeOt);
app.post("/api/admin/wicket", wicket);
app.post("/api/admin/match", createMatch)

// API for all invalid routes
app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: "Invalid route",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
