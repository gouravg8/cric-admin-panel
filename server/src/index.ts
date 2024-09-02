import express, { type Request, type Response } from "express";
import mongoose, { connect } from "mongoose";
import { Match, Player, Log } from "./db/schema";
import cors from "cors";
import dotenv from "dotenv";
import { adminController } from "./controllers/adminController";
dotenv.config();

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get("/api/admin", adminController);

// API for all invalid routes
app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: "Invalid route",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
