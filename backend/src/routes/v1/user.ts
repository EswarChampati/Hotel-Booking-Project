import express, { Router } from "express";
import validateToken from "../../middlewares/validateToken";
import validateHotel from "../../middlewares/validateHotel";
import upload from "../../middlewares/upload";
import createHotel from "../../controllers/v1/hotel.controller";

const router: Router = express.Router();

router.post(
  "/hotel",
  validateToken,
  upload.array("imageFiles", 6),
  validateHotel,

  createHotel
);

export default router;
