import { useDispatch } from "react-redux";
import { logout } from "../features/User/userSlice";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogOut}>Exit</button>
    </div>
  );
};

export default Chat;
