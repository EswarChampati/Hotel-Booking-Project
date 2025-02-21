import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongodbServer: MongoMemoryServer;

export const connectDB = async () => {
  mongodbServer = await MongoMemoryServer.create();
  const url = mongodbServer.getUri();
  await mongoose.connect(url);
};

export const clearCollections = async () => {
  if (mongoose.connection.readyState !== 1) return;
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
  if (mongodbServer) {
    await mongodbServer.stop();
  }
};
