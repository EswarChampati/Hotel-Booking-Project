import AnimatedButton from "./AnimatedButton";
import ToggleTheme from "./ToggleTheme";
const Header = () => {
  return (
    <div className="flex justify-between items-center px-32 border-b-2 py-2 container mx-auto ">
      <div className="flex">
        <div className=" text-4xl font-bold">Booking.com</div>
      </div>

      <section className="py-2 space-x-12">
        <AnimatedButton to="/Signup">Register</AnimatedButton>
        <AnimatedButton to="/Signin">Signin</AnimatedButton>
        <ToggleTheme />
      </section>
    </div>
  );
};
export default Header;
