import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastState = {
  message: string;
  type: "SUCCESS" | "FAILURE";
  visible: boolean;
};

const initialState: ToastState = {
  message: "",
  type: "SUCCESS",
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: "SUCCESS" | "FAILURE" }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideToaste: (state) => {
      state.visible = false;
    },
  },
});
export const { showToast, hideToaste } = toastSlice.actions;
export default toastSlice.reducer;
