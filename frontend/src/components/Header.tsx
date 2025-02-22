import { useSelector } from "react-redux";
import AnimatedButton from "./AnimatedButton";
import ToggleTheme from "./ToggleTheme";
import { RootState } from "../store";
import useLagout from "../hooks/useLagout";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const handleLagout = useLagout();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate: NavigateFunction = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div
      className="flex justify-between items-center px-8  md:px-16 lg:px-32 border-b-2 py-2 container 
    mx-auto text-common bg-common"
    >
      <div className="flex">
        <div
          className=" text-3xl lg:text-4xl font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking.com
        </div>
      </div>

      <section className="hidden md:flex  py-2 space-x-6 lg:space-x-12">
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
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-common shadow-lg py-2 flex flex-col items-center space-y-4 md:hidden z-50">
          {isAuthenticated ? (
            <>
              <AnimatedButton to="/my-bookings">My Bookings</AnimatedButton>
              <AnimatedButton to="/my-hotels">My hotels</AnimatedButton>
              <AnimatedButton to="/logout" onClick={handleLagout}>
                Logout
              </AnimatedButton>
            </>
          ) : (
            <AnimatedButton to="/login">Login</AnimatedButton>
          )}
          <ToggleTheme />
        </div>
      )}
    </div>
  );
};
export default Header;
