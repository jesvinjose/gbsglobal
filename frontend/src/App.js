import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/admin/Login";
import Users from "./pages/admin/Users";
import UserLogin from "./pages/client/UserLogin";
import UserProfile from "./pages/client/UserProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Users />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
