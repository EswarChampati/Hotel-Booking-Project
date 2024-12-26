import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AnimatedButtonProps {
  to: string;
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ to, children }) => {
  return (
    <motion.button
      className=" text-xl rounded-lg py-2 px-3 buttonlight dark:buttondark"
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.8,
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <Link to={to}>{children}</Link>
    </motion.button>
  );
};

export default AnimatedButton;
