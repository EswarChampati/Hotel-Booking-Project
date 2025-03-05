import { z } from "zod";

const hotelSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  city: z.string().min(1, "City is Required"),
  country: z.string().min(4, "country name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "type is required"),
  adultCount: z.number().min(1, "At least one adult is required"),
  childCount: z.number().min(0, "Childrens Count cant be negative"),
  facilities: z.array(z.string()).min(1, "At least one facility is required"), // remember how to write this
  pricePerNight: z.number().positive("Price must be a positive number"),
  starRating: z.number().min(1).max(5, "Star rating must be between 1 and 5"),
});

export default hotelSchema;
 