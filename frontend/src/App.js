import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/admin/Login";
import Users from "./pages/admin/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
