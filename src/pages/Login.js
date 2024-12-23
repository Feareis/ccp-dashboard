import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = ({ users = [], setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie si users est bien défini
    if (!users || users.length === 0) {
      alert("Aucun utilisateur trouvé !");
      return;
    }

    const user = users.find(
      (u) => u.login === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Login ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">SE CONNECTER</button>
        </form>
        <p>Demandez vos accès / Rejoindre la Cantina</p>
        <div className="social-icons">
          <a href="https://discord.gg/Q7ZR4aqrjC" target="_blank" rel="noopener noreferrer">
            <img src={require("../assets/logo/transparent-dicord-logo.png")} alt="Discord" />
          </a>
        </div>
      <footer>Feareis - © 2024</footer>
      </div>
    </div>
  );
};

export default Login;
