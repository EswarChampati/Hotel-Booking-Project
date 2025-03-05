import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types/user";

const ImageSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="font-bold text-2xl mb-5">Images</h2>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          className="rounded "
          {...register("imageFiles", {
            validate: (CurrentImage) => {
              const totalLength = CurrentImage.length;
              if (totalLength === 0) return "Atleast one image is required";
              if (totalLength > 6) return "Total image cant be more than 6";
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="error-text">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};
export default ImageSection;
