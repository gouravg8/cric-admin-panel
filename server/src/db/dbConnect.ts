import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
function dbConnect() {
    if (MONGO_URI) {
        mongoose.connect(MONGO_URI);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.on("open", () => console.log("Connected to MongoDB"));
    }
}

export default dbConnect;