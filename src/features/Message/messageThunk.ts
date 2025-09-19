// messageThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket } from "../../services/api/messageApi";

export const initSocket = createAsyncThunk<
  boolean, // fulfilled tipi
  void, // parametre yok
  { rejectValue: string }
>("socket/init", async (_, { rejectWithValue }) => {
  try {
    connectSocket();
    return true;
  } catch {
    return rejectWithValue("Socket connection failed");
  }
});

export const closeSocket = createAsyncThunk(
  "socket/close",
  async (_, { fulfillWithValue }) => {
    disconnectSocket();
    return fulfillWithValue(true);
  }
);
