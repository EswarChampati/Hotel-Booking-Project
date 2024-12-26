import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
};
export default connectDB;
