import express, { Application } from "express";
import cors from "cors";
import users from "./routes/v1/users";
import { ROUTES } from "./constants/routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ROUTES.API.V1.USERS.BASE, users);

export default app;
