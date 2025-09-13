import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404 - Page Not Found </h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
