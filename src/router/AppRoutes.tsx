import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Chat from "../pages/Chat";
import RegisterPage from "../pages/RegisterPage";
import { PrivateRoute, PublicRoute } from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found </h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
