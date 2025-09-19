import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// messageApi.ts
export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000"); // sabit URL burada
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;
