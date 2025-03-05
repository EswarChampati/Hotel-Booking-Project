import { useFormContext } from "react-hook-form";
import { HotelFacilities } from "../../../constants/Hotel";
import { HotelFormData } from "../../../types/user";

const FacilitiesSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className=" w-1/2 mx-auto mb-5">
      <h2 className="font-bold text-2xl mb-3">Facilities</h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 justify-items-stretch">
        {HotelFacilities.map((Facilitiy) => (
          <label className="flex gap-1" key={Facilitiy}>
            <input
              type="checkbox"
              value={Facilitiy}
              {...register("facilities", {
                validate: (currentValue) => {
                  if (currentValue && currentValue.length > 0) return true;
                  else return "Atleast one Facility is required";
                },
              })}
            />
            {Facilitiy}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="error-text">{errors.facilities?.message}</span>
      )}
    </div>
  );
};
export default FacilitiesSection;
