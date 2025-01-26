import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { validToken } from "../services/authService";
import { login, logout } from "../store/slices/authSlice";

const useValidToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const checkToken = async () => {
    try {
      const data = await validToken();
      dispatch(login(data.userId));
    } catch (err) {
      console.log(err);
      dispatch(logout());
    }
  };

  useEffect(() => {
    checkToken();
  }, [dispatch]);
};

export default useValidToken;
