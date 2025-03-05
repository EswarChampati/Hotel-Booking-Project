import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types/user";

interface Props {
  name: keyof HotelFormData;
  label: string;
  placeholder: string;
  type?: string;
}
const FormInput: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col w-1/2">
      <label className="font-bold">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name, { required: `${name} is required` })}
        className="form-control"
      ></input>

      {errors[name] && (
        <span className="error-text">{errors[name].message}</span>
      )}
    </div>
  );
};
export default FormInput;
