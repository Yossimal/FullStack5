import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/login";
import SignUp from "../pages/SignUp/sign-up";
import Home from "../pages/Home/home";
import makePrivate from "./private-route";
import Todos from "../pages/Todos/todos";

export default function Router() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="home" element={makePrivate(<Home />)} />
      <Route path="profile" element={<h1>Profile</h1>} />
      <Route path="albums" element={<h1>Albums</h1>}>
        <Route path=":albumId" element={<h1>Album</h1>} />
      </Route>
      <Route path="todos" element={makePrivate(<Todos/>)} />
      <Route path="posts" element={<h1>Posts</h1>} />
    </Routes>
  );
}
