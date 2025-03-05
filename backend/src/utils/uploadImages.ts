import { cloudinary } from "../config/cloudinary";

const uploadImage = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromies = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });
  return await Promise.all(uploadPromies);
};

export default uploadImage;
