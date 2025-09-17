import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.token ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.token ? <Navigate to="/chat" /> : children;
};
