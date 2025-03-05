import { FormProvider } from "react-hook-form";
import useHotelForm from "../../../hooks/useHotelForm";
import HotelDetailsSection from "./HotelDetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { motion } from "framer-motion";

interface Props {
  onSave: (HotelFormData: FormData) => void;
  isPending: boolean;
}

const ManageHotelform: React.FC<Props> = ({ onSave, isPending }) => {
  const { formMethods, onSubmit } = useHotelForm(onSave);
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="self-center mt-4">
          <motion.button
            disabled={isPending}
            className={`border-2 rounded-2xl p-1 px-4 bg-common text-common 
              hover:text-cyan-500 dark:hover:text-blue-400 
            `}
            whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
          >
            {isPending ? "Saving.." : "Save"}
          </motion.button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelform;
