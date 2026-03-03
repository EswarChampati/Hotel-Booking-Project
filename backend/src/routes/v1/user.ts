import express, { Request, Response, Router } from "express";
import validateToken from "../../middlewares/validateToken";
import validateHotel from "../../middlewares/validateHotel";
import upload from "../../middlewares/upload";
import createHotel from "../../controllers/v1/hotel.controller";
import HotelModel from "../../models/hotel.model";
import httpStatusCode from "../../constants/httpStatusCode";
import { SERVER_ERROR } from "../../constants/errorMessage";

const router: Router = express.Router();

router.post(
  "/hotel",
  validateToken,
  upload.array("imageFiles", 6),
  validateHotel,

  createHotel
);

router.get("/hotel", validateToken, async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find({ userId: req.userId });
    res.status(200).json(hotels);
    return;
  } catch (e) {
    console.log("Error in fetching the hotels" + (e as Error).message);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error in fetching hotels" });
  }
});

router.get("/hotel/:id", validateToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const hotel = await HotelModel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.status(httpStatusCode.OK).json(hotel);
    return;
  } catch (e) {
    console.log((e as Error).message);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: SERVER_ERROR });
    return;
  }
});

export default router;
