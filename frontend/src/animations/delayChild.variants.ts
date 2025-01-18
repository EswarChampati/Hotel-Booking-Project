import { Variants } from "motion/react";

export const delayChildVarients: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
