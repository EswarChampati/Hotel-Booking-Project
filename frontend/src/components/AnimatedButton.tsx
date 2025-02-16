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
      className=" text-xl rounded-lg py-2 px-3 text-common bg-common button-hover"
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
      <Link to={to}>{children}</Link>
    </motion.button>
  );
};

export default AnimatedButton;
