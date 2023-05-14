import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";
import PrivateRoute from "./private-route";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
