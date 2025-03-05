import mongoose, { Model, Schema } from "mongoose";
import { hotelType } from "../interfaces/hotel";

const hotelSchema: Schema<hotelType> = new mongoose.Schema<hotelType>({
  //new keyword here
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, requierd: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageURL: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const HotelModel: Model<hotelType> = mongoose.model("hotel", hotelSchema); // no new key word here
export default HotelModel;
