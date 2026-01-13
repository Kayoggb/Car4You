import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css"; // Importiere die CSS für Login & Registrierung

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Nutzer holen
  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  // Registrierung abwickeln
  const handleRegister = (e) => {
    e.preventDefault();
    const users = getUsers();
    if (users.find(u => u.username === username)) {
      setError("Benutzername existiert bereits.");
      return;
    }
    const updatedUsers = [...users, { username, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    // Erfolgreich: direkt weiterleiten zum Login
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Registrierung</h2>
        <form className="login-form" onSubmit={handleRegister}>
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
          <button type="submit" className="login-btn">Registrieren</button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Bereits registriert?{" "}
          <span
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Zum Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
