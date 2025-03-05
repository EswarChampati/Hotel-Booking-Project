import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputFeild from "../components/InputFeild";
import PasswordFeild from "../components/PasswordFeild";
import { RegisterFormData } from "../types/auth";
import { delayChildVarients } from "../animations/delayChild.variants";
import { itemVarients } from "../animations/fadeTopToButton.variants";
import useAuthMutation from "../hooks/useAuthMutation";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useAuthMutation("register");

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={delayChildVarients}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-auto  w-full max-w-xl px-6 "
    >
      <h1 className="font-bold  flex-start py-3 self-center mb-6 text-2xl">
        Create an Account
      </h1>
      <div className="flex flex-col md:flex-row gap-4 text-gray-800">
        <motion.div variants={itemVarients} className="w-full md:w-1/2">
          <InputFeild
            label="First Name"
            placeholder="Enter the First Name"
            register={register}
            type="text"
            name="firstName"
            validationRules={{ required: "FirstName field is required" }}
            errors={errors}
            autoFocus={true}
          />
        </motion.div>

        <motion.div variants={itemVarients} className="w-full md:w-1/2">
          <InputFeild
            label="Last Name"
            placeholder="Enter the Last Name"
            register={register}
            type="text"
            name="lastName"
            validationRules={{ required: "LastName field is required" }}
            errors={errors}
          />
        </motion.div>
      </div>
      <motion.div variants={itemVarients}>
        <InputFeild
          label="Email"
          placeholder="Enter the Email Address"
          register={register}
          type="email"
          name="email"
          validationRules={{ required: "Email field is required" }}
          errors={errors}
        />
      </motion.div>
      <motion.div variants={itemVarients}>
        <PasswordFeild
          label="Password"
          placeholder="Enter the password"
          register={register}
          name="password"
          validationRules={{
            required: "Password field is required",
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
          }}
          errors={errors}
        />
      </motion.div>
      <motion.div variants={itemVarients}>
        <PasswordFeild
          label="Confirm Password"
          placeholder="Re-Enter the password"
          register={register}
          name="confirmPassword"
          validationRules={{
            validate: (val: string) => {
              if (!val) return "Confirm-Password field is required";
              if (watch("password") !== val) return "Passwords don't match";
              return true;
            },
          }}
          errors={errors}
        />
      </motion.div>
      <motion.button
        className="border self-center w-full sm:w-1/4 mt-4 py-2 font-semibold rounded-lg bg-common text-common hover:text-cyan-500 dark:hover:text-blue-400"
        whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
        whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
      >
        Create User
      </motion.button>
    </motion.form>
  );
};
export default Register;
