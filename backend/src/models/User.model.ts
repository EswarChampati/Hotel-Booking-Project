import mongoose, { Document, Model, Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import { hash } from "bcryptjs";

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser & Document>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 8);
  }
  next();
});
const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);
export default User;
