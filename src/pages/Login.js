import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import "./css/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);

    // Simule une connexion réussie
    if (username && password) {
      // Redirection vers le Dashboard
      setIsAuthenticated(true);
      navigate("/"); // Redirige vers la page du Dashboard
    } else {
      alert("Veuillez entrer un pseudo et un mot de passe.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>La Cantina</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="mot de passe"
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
