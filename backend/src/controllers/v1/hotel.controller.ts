import { Request, Response } from "express";
import { hotelType } from "../../interfaces/hotel";
import uploadImage from "../../utils/uploadImages";
import HotelModel from "../../models/hotel.model";
import httpStatusCode from "../../constants/httpStatusCode";

const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const imageFiles = req.files as Express.Multer.File[];

    const newHotel: hotelType = req.body;
    newHotel.userId = req.userId;

    if (!newHotel.userId) {
      res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ msg: "User ID is required" });
      return;
    }

    const imageURl = await uploadImage(imageFiles);
    newHotel.imageURL = imageURl;
    newHotel.lastUpdated = new Date();

    const hotel = new HotelModel(newHotel);
    await hotel.save();
    res.status(httpStatusCode.CREATED).send(hotel);
    return;
  } catch (e) {
    console.log("Error in the hotel controller" + e);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
    return;
  }
};

export default createHotel;
