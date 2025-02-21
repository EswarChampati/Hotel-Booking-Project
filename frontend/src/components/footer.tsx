import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { delayChildVarients as listVarients } from "../animations/delayChild.variants";
import { itemVarients } from "../animations/fadeTopToButton.variants";

const Footer: React.FC = () => {
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
        <Link to="/partners">Partners</Link>
      </motion.li>
      <motion.li variants={itemVarients}>
        <Link to="/Aboutus">About</Link>
      </motion.li>
    </motion.ul>
  );
};

export default Footer;
