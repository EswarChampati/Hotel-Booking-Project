import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { delayChildVarients } from "../animations/delayChild.variants";
import { itemVarients } from "../animations/fadeTopToButton.variants";
import InputFeild from "../components/InputFeild";
import PasswordFeild from "../components/PasswordFeild";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { showToast } from "../store/slices/toastSlice";
import { login as loginAction } from "../store/slices/authSlice";
import { AppDispatch } from "../store";
import React, { useRef, useEffect } from "react";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      emailRef.current?.focus();
    }, 500);
  }, []);

  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(showToast({ message: "Login Successful", type: "SUCCESS" }));
      dispatch(loginAction({ userId: data._id }));
      navigate("/");
    },
    onError: (err: Error) => {
      dispatch(showToast({ message: err.message, type: "FAILURE" }));
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "email" | "password"
  ) => {
    if (field === "email" && e.key === "Tab") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
    if (field === "password" && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={delayChildVarients}
      className="flex flex-col gap-4 mx-auto w-full max-w-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.h2 className="font-bold text-3xl  self-center my-4">
        Login
      </motion.h2>
      <motion.div variants={itemVarients}>
        <InputFeild
          label="Email"
          placeholder="Enter the Email Address"
          register={register}
          type="email"
          name="email"
          validationRules={{ required: "This field is required" }}
          errors={errors}
          inputRef={emailRef}
          onKeyDown={(e) => handleKeyDown(e, "email")}
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
          inputRef={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, "password")}
        />
      </motion.div>
      <motion.div variants={itemVarients}>
        <span className="font-semibold">
          Not Register?
          <Link className="mx-2 underline font-light" to="/register">
            Click here to Create an account
          </Link>
        </span>
      </motion.div>
      <motion.button
        variants={itemVarients}
        type="submit"
        className=" border self-center w-3/12 mt-3 py-2 font-semibold  rounded-2xl bg-common text-common hover:text-cyan-500 dark:hover:text-blue-400"
        whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
        whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
      >
        Create User
      </motion.button>
    </motion.form>
  );
};
export default SignIn;
