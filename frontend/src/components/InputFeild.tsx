import { motion, AnimatePresence } from "framer-motion";
type InputFeildProps = {
  label: string;
  placeholder: string;
  register: any;
  type: string;
  name: string;
  validationRules?: object;
  errors: any;
  autoFocus?: boolean;
};

const InputFeild: React.FC<InputFeildProps> = ({
  label,
  placeholder,
  register,
  type,
  name,
  validationRules,
  errors,
  autoFocus,
}) => {
  return (
    <div className=" max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col space-y-1 ">
      <label className="font-bold px-2 py-1 flex-1 text-common bg-common">
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        className=" font-normal w-full form-control text-base md:text-lg "
        {...register(name, validationRules)}
      />
      {errors[name] && (
        <AnimatePresence>
          <motion.span
            className="text-red-500 dark:text-red-400 text-base"
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
export default InputFeild;
