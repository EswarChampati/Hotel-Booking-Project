import { motion, AnimatePresence } from "framer-motion";
type InputFeildProps = {
  label: string;
  placeholder: string;
  register: any;
  type: string;
  name: string;
  validationRules?: object;
  errors: any;
};

const InputFeild: React.FC<InputFeildProps> = ({
  label,
  placeholder,
  register,
  type,
  name,
  validationRules,
  errors,
}) => {
  return (
    <label className="font-bold px-2 py-1 my-10 flex-1 text-common bg-common">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded font-normal w-full my-1 py-2 px-2 dark:text-black placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        {...register(name, validationRules)}
      />
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
export default InputFeild;
