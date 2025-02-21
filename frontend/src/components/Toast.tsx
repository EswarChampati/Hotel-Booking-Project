import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useEffect } from "react";
import { hideToaste } from "../store/slices/toastSlice";
import { motion } from "framer-motion";

const Toast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, type, visible } = useSelector((state: RootState) => {
    return state.toast;
  });

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToaste());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md  text-white max-w-md bg-slate-600 dark:bg-slate-300 dark:text-gray-800"
      : "fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md bg-red-400 dark:bg-red-600";

  return visible === false ? null : (
    <motion.div
      className={styles}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      }}
    >
      <div
        className="flex justify-center items-center"
        data-testid="test-container"
      >
        <span className="font-semibold">{message}</span>
      </div>
    </motion.div>
  );
};
export default Toast;
