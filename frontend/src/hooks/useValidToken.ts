import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { validToken } from "../services/authService";
import { login, logout } from "../store/slices/authSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";

const useValidToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const checkToken = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        dispatch(logout());
        return;
      }
      const { userName } = JSON.parse(storedUser);

      const data = await validToken();
      dispatch(login({ userId: data.userId, userName: userName }));
    } catch (err) {
      console.log("token valdiation failed", err);
      navigate("/login");
      dispatch(logout());
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    checkToken();
  }, [dispatch]);
};

export default useValidToken;
