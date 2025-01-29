import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout as logoutAction } from "../store/slices/authSlice";
import { showToast } from "../store/slices/toastSlice";

const useLagout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(logoutAction());
      dispatch(showToast({ message: "Sign Out!", type: "SUCCESS" }));
    },
    onError: (err: Error) => {
      dispatch(showToast({ message: err.message, type: "FAILURE" }));
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  return handleLogout;
};
export default useLagout;
