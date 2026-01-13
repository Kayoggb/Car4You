import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Nutzer aus localStorage holen
    const users = localStorage.getItem("users");
    const userList = users ? JSON.parse(users) : [];
    const userFound = userList.find(u => u.username === username && u.password === password);
    if (userFound) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      setError("Benutzername oder Passwort falsch.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Benutzername:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <label>Passwort:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Noch kein Konto? <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => navigate("/register")}>Registrieren</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
