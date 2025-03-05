import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types/user";

const GuestSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="font-bold text-2xl mb-2">Guests</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          Adults
          <input
            type="number"
            className="w-full form-control"
            min={1}
            {...register("adultCount", {
              required: "Adult field is Required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="error-text">{errors.adultCount.message}</span>
          )}
        </div>
        <div>
          Child
          <input
            type="number"
            className="w-full form-control"
            min={0}
            {...register("childCount", {
              required: "Child field is Required",
            })}
          />
          {errors.childCount?.message && (
            <span className="error-text">{errors.childCount.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
