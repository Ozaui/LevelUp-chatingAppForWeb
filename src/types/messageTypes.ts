export type Message = {
  fromUserId: string;
  text: string;
  self?: boolean;
  createdAt?: string;
};

export interface SocketState {
  isConnected: boolean;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export type ConnectPayload = {
  url: string;
};
