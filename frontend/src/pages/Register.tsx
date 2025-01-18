import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputFeild from "../components/InputFeild";
import PasswordFeild from "../components/PasswordFeild";
import { RegisterFormData, UserResponse } from "../types/user";
import { delayChildVarients } from "../animations/delayChild.variants";
import { itemVarients } from "../animations/fadeTopToButton.variants";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/userService";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation<UserResponse, Error, RegisterFormData>(
    createUser,
    {
      onSuccess: () => {
        console.log("Registration successful");
      },
      onError: (err: Error) => {
        console.error("Error during registration:", err.message);
      },
    }
  );

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={delayChildVarients}
      onSubmit={onSubmit}
      className="flex flex-col mx-auto  w-full max-w-xl"
    >
      <h1 className="font-bold text-3xl flex-start py-3 self-center mb-4">
        Create an Account
      </h1>
      <div className="flex flex-col md:flex-row gap-4 text-gray-800">
        <motion.div variants={itemVarients}>
          <InputFeild
            label="First Name"
            placeholder="Enter the First Name"
            register={register}
            type="text"
            name="firstName"
            validationRules={{ required: "This field is required" }}
            errors={errors}
          />
        </motion.div>

        <motion.div variants={itemVarients}>
          <InputFeild
            label="Last Name"
            placeholder="Enter the Last Name"
            register={register}
            type="text"
            name="lastName"
            validationRules={{ required: "This field is required" }}
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
          validationRules={{ required: "This field is required" }}
          errors={errors}
        />
      </motion.div>
      <motion.div variants={itemVarients}>
        <PasswordFeild
          label="Password"
          placeholder="Enter the password"
          type="password"
          register={register}
          name="password"
          validationRules={{
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
          }}
          watch={watch}
          errors={errors}
        />
      </motion.div>
      <motion.div variants={itemVarients}>
        <PasswordFeild
          label="Confirm Password"
          placeholder="Re-Enter the password"
          type="password"
          register={register}
          name="confirmPassword"
          validationRules={{
            validate: (val: string) => {
              if (!val) return "This field is required";
              if (watch("password") !== val) return "Passwords don't match";
              return true;
            },
          }}
          watch={watch}
          errors={errors}
        />
      </motion.div>
      <motion.button
        className="hover:underline border self-center w-3/12 mt-3 py-2 font-semibold  rounded-2xl bg-common text-common button-hover "
        whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
        whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
      >
        Create button
      </motion.button>
    </motion.form>
  );
};
export default Register;
