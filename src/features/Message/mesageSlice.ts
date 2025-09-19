import { createSlice } from "@reduxjs/toolkit";
import type { SocketState } from "../../types/messageTypes";
import { initSocket, closeSocket } from "./messageThunk";

const initialState: SocketState = {
  isConnected: false,
  messages: [],
  loading: false,
  error: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initSocket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initSocket.fulfilled, (state) => {
        state.isConnected = true;
        state.loading = false;
      })
      .addCase(initSocket.rejected, (state, action) => {
        state.isConnected = false;
        state.loading = false;
        state.error = action.payload || "Socket connection failed";
      })
      .addCase(closeSocket.fulfilled, (state) => {
        state.isConnected = false;
      });
  },
});

export default socketSlice.reducer;
