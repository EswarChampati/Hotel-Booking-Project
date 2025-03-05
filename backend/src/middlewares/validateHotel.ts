import { NextFunction, Request, Response } from "express";
import hotelSchema from "../validations/v1/hotel.validation";
import httpStatusCode from "../constants/httpStatusCode";
import { INVALID_INPUT } from "../constants/errorMessage";

const validateHotel = (req: Request, res: Response, next: NextFunction) => {
  req.body.adultCount = Number(req.body.adultCount);
  req.body.starRating = Number(req.body.starRating);
  req.body.childCount = Number(req.body.childCount);
  req.body.pricePerNight = Number(req.body.pricePerNight);
  const result = hotelSchema.safeParse(req.body);

  if (!result.success) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      msg: INVALID_INPUT,
    });

    return;
  }

  next();
};

export default validateHotel;
