import { useSelector } from "react-redux";
import AnimatedButton from "./AnimatedButton";
import ToggleTheme from "./ToggleTheme";
import { RootState } from "../store";
import useLagout from "../hooks/useLagout";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Header = () => {
  const handleLagout = useLagout();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="flex justify-between items-center px-32 border-b-2 py-2 container mx-auto text-common bg-common">
      <div className="flex">
        <div
          className=" text-4xl font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking.com
        </div>
      </div>

      <section className="py-2 space-x-12">
        {isAuthenticated ? (
          <>
            <AnimatedButton to="/my-bookings">My Bookings</AnimatedButton>
            <AnimatedButton to="/my-hotels">My hotels</AnimatedButton>
            <AnimatedButton to="/logout" onClick={handleLagout}>
              logout
            </AnimatedButton>
          </>
        ) : (
          <>
            <AnimatedButton to="/login">Login</AnimatedButton>
          </>
        )}
        <ToggleTheme />
      </section>
    </div>
  );
};
export default Header;
