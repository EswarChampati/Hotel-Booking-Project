import dotenv from "dotenv";
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env" });

import app from "./app";
import connectDB from "./config/db.config";
import startServer from "./config/server.config";

connectDB();
startServer(app);
