import { afterAll, afterEach, beforeAll } from "vitest";
import { clearCollections, closeDB, connectDB } from "./configs/testDB";

import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

beforeAll(() => {
  connectDB();
});

afterEach(() => {
  clearCollections();
});

afterAll(() => {
  closeDB();
});
