import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AnimatedButtonProps {
  to: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  to,
  children,
  onClick,
}) => {
  return (
    <motion.button
      className=" text-lg md:text-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg py-2 px-3
       text-common bg-common button-hover"
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.8,
        transition: { duration: 0.3 },
      }}
      onClick={onClick}
    >
      <Link className="block w-full h-full text-center" to={to}>
        {children}
      </Link>
    </motion.button>
  );
};

export default AnimatedButton;
