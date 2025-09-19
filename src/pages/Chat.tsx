import { useEffect, useState } from "react";
import { initSocket, closeSocket } from "../features/Message/messageThunk";
import { getSocket } from "../services/api/messageApi";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/User/userSlice";
import type { Message } from "../types/messageTypes";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Socket başlat
    dispatch(initSocket());

    const socket = getSocket();
    if (socket) {
      socket.on("private_message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      dispatch(closeSocket());
    };
  }, [dispatch]);

  const handleSend = () => {
    const socket = getSocket();
    if (!socket || !text.trim()) return;

    const msg = {
      fromUserId: "me",
      text,
      self: true,
    };

    socket.emit("private_message", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogOut}>Exit</button>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.self ? "right" : "left" }}>
            <strong>{m.self ? "You" : m.fromUserId}:</strong> {m.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
