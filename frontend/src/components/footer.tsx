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
      className="flex flex-col items-center gap-y-2 text-xl justify-around pb-4 md:pb-6  pt-4 md:pt-6font-semiboldlight border-t-2 bg-common text-common md:flex-row "
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
