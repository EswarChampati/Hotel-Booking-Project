import express, { Application } from "express";
import cors from "cors";
import users from "./routes/v1/users";
import { ROUTES } from "./constants/routes";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ROUTES.API.V1.USERS.BASE, users);

export default app;
