import { useSelector } from "react-redux";
import AnimatedButton from "./AnimatedButton";
import ToggleTheme from "./ToggleTheme";
import { RootState } from "../store";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div className="flex justify-between items-center px-32 border-b-2 py-2 container mx-auto text-common bg-common">
      <div className="flex">
        <div className=" text-4xl font-bold">Booking.com</div>
      </div>

      <section className="py-2 space-x-12">
        {isAuthenticated ? (
          <>
            <AnimatedButton to="/my-bookings">My Bookings</AnimatedButton>
            <AnimatedButton to="/my-hotels">My hotels</AnimatedButton>
            <AnimatedButton to="/logout">logout</AnimatedButton>
          </>
        ) : (
          <>
            <AnimatedButton to="/register">Register</AnimatedButton>
            <AnimatedButton to="/Signin">Login</AnimatedButton>
          </>
        )}
        <ToggleTheme />
      </section>
    </div>
  );
};
export default Header;
