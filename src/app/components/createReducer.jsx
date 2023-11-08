import { createSlice } from "@reduxjs/toolkit";
import { getImage } from "./action";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};
const createReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })

      .addCase(getImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default createReducer;
