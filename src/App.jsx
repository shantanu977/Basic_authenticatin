import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: "center", margin: 20 }}>
        <Link
          to="/login"
          style={{ marginRight: 10, textDecoration: "none", color: "blue" }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "blue" }}
        >
          Register
        </Link>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
