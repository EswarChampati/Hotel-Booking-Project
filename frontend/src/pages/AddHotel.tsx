import { useMutation } from "@tanstack/react-query";
import ManageHotelform from "../components/forms/manageHotelForm/manageHotelform";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/toastSlice";
import { addHotel } from "../services/userService";

const AddHotel: React.FC = () => {
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: addHotel,
    onSuccess: () => {
      dispatch(showToast({ message: "Hotel Saved!", type: "SUCCESS" }));
    },

    onError: () => {
      dispatch(showToast({ message: "Error Saving hotel", type: "FAILURE" }));
    },
  });
  const SaveForm = (HotelData: FormData) => {
    mutate(HotelData);
  };
  return (
    <div>
      <ManageHotelform isPending={isPending} onSave={SaveForm} />
    </div>
  );
};
export default AddHotel;
