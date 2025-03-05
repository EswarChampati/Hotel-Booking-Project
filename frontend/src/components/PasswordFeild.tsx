import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordFeildProps = {
  label: string;
  placeholder: string;
  register: any;
  name: string;
  validationRules: object;
  errors: any;
};

const PasswordFeild: React.FC<PasswordFeildProps> = ({
  label,
  placeholder,
  register,
  name,
  validationRules,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordInvisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col space-y-1 ">
      <label className="font-bold text-common bg-common relative">
        {label}
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className=" font-normal w-full text-base form-control"
          {...register(name, validationRules)}
        />
        <button
          onClick={togglePasswordInvisibility}
          className="absolute  inset-y-0 right-3 flex items-center text-gray-600"
          type="button"
        >
          {showPassword ? (
            <FaEyeSlash data-testid="FaEyeSlash" size={18} />
          ) : (
            <FaEye data-testid="FaEye" size={18} />
          )}
        </button>
      </div>

      {errors[name] && (
        <AnimatePresence>
          <motion.span
            className="text-red-500 dark:text-red-400 "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          >
            {errors[name]?.message}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PasswordFeild;
