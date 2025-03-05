import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types/user";
import FormInput from "./formInput";

const HotelDetailsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" flex flex-col items-center mb-3">
      <h2 className="font-bold text-4xl mb-5">Add Hotel</h2>
      <FormInput label="Name" name="name" placeholder="Enter the Name" />
      <div className="flex flex-row gap-4 w-1/2">
        <FormInput label="City" name="city" placeholder="Enter the City" />
        <FormInput
          label="Country"
          name="country"
          placeholder="Enter the Country"
        />
      </div>
      <div className="flex flex-col w-1/2">
        <label className="font-bold">Description</label>
        <textarea
          rows={8}
          {...register("description", {
            required: "Description feild is required",
          })}
          className="form-control"
        ></textarea>
        {errors.description && (
          <span className="error-text">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-row w-1/2 gap-4">
        <FormInput
          label="Price Per Night"
          name="pricePerNight"
          placeholder="Enter the Price Per Night "
        />
        <div className="flex flex-col w-1/2">
          <label className="font-bold">Star Rating</label>
          <select
            {...register("starRating", {
              required: "star Rating field is required ",
            })}
            className="form-control"
          >
            <option className="text-gray-600" value="">
              Select a Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => {
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
          {errors.starRating && (
            <span className="error-text">{errors.starRating.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default HotelDetailsSection;
