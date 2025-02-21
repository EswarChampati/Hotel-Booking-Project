import { describe, expect, it } from "vitest";
import { showToast, ToastState } from "../../../store/slices/toastSlice";
import toastreducer from "../../../store/slices/toastSlice";

describe("ToastSlice", () => {
  it("Should handle showToast action", () => {
    const initialState: ToastState = {
      message: "",
      type: "SUCCESS",
      visible: false,
    };
    const action = showToast({ message: "User Created", type: "SUCCESS" });
    const nextState = toastreducer(initialState, action);
    expect(nextState).toEqual({
      message: "User Created",
      type: "SUCCESS",
      visible: true,
    });
  });
  it("Should handle hideToast action", () => {
    const initialState: ToastState = {
      message: "",
      type: "FAILURE",
      visible: true,
    };
    const action = { type: "toast/hideToaste" };
    const nextState = toastreducer(initialState, action);
    expect(nextState.visible).toBe(false);
  });
});
