import { useMutation } from "@tanstack/react-query";
import { login, createUser } from "../services/authService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { showToast } from "../store/slices/toastSlice";
import { login as loginAction } from "../store/slices/authSlice";

const useAuthMutation = (type: "login" | "register") => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: type === "login" ? login : createUser,
    onSuccess: (data) => {
      const username = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
      dispatch(
        showToast({
          message: type === "login" ? "Login Successful" : "user Created",
          type: "SUCCESS",
        })
      );
      navigate("/");
      localStorage.setItem("user", JSON.stringify({ userName: username }));

      dispatch(
        loginAction({
          userId: data._id,
          userName: data.firstName + " " + data.lastName,
        })
      );
    },
    onError: (err: Error) => {
      dispatch(showToast({ message: err.message, type: "FAILURE" }));
    },
  });
};

export default useAuthMutation;
