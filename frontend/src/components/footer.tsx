import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
const listVarients: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
};
const itemVarients: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
const footer: React.FC = () => {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={listVarients}
      className="flex text-xl justify-around px-8 pb-16 pt-4 font-semiboldlight border-t-2 bg-common text-common"
    >
      <motion.li variants={itemVarients}>
        <Link to="/policy">Privacy policy</Link>
      </motion.li>
      <motion.li variants={itemVarients}>
        <Link to="/Terms and conditions">Terms and Conditions</Link>
      </motion.li>
      <motion.li variants={itemVarients}>
        <Link to="/partners">partners</Link>
      </motion.li>
      <motion.li variants={itemVarients}>
        <Link to="/Aboutus">About</Link>
      </motion.li>
    </motion.ul>
  );
};

export default footer;
