import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db.config";
import startServer from "./config/server.config";

connectDB();
startServer(app);
