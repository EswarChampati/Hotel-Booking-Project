import express, { Application } from "express";
import cors from "cors";
import authRouter from "./routes/v1/auth";
import { ROUTES } from "./constants/routes";
import cookieParser from "cookie-parser";
import path from "path";
import userRouter from "./routes/v1/user";
const app: Application = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.API.V1.BASE, authRouter);
app.use(ROUTES.API.V1.BASE, userRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
});

export default app;
