import { createSlice } from "@reduxjs/toolkit";

type VisibilityState = {
  isVisible: boolean;
};

const initialState: VisibilityState = {
  isVisible: false,
};

export const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;
