import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordFeildProps = {
  label: string;
  placeholder: string;
  register: any;
  name: string;
  validationRules: object;
  watch: any;
  errors: any;
};

const PasswordFeild: React.FC<PasswordFeildProps> = ({
  label,
  placeholder,
  register,
  name,
  validationRules,
  watch,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordInvisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <label className="font-bold px-2 py-1 flex-1 text-common bg-common relative">
      {label}
      <input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className="border-2 rounded font-normal w-full  my-1 py-2 px-2 dark:text-black placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        {...register(name, validationRules)}
      />
      <button
        onClick={togglePasswordInvisibility}
        className="absolute top-11 left-[550px] "
        type="button"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>

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
    </label>
  );
};

export default PasswordFeild;
