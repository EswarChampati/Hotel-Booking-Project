import { useFormContext } from "react-hook-form";
import { HotelTypes } from "../../../constants/Hotel";
import { HotelFormData } from "../../../types/user";

const TypeSection: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const typeValue = watch("type");
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <h2 className="font-bold text-2xl mb-5 w-1/2">Type of Hotel</h2>
      <div className="grid grid-cols-5 gap-4">
        {HotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold
              ${
                typeValue === type
                  ? "bg-blue-200 dark:bg-blue-800 text-black dark:text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }
            `}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "Atleast one feild must be selected",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type?.message && (
        <span className="error-text">{errors.type.message}</span>
      )}
    </div>
  );
};
export default TypeSection;
