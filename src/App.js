import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Layout from "./components/Layout";


// Pages fictives pour le moment
import Dashboard from "./pages/Dashboard";
import Produits from "./pages/Produits";
import Contrats from "./pages/Contrats";
import GestionPatron from "./pages/GestionPatron";
import ListeEmployees from "./pages/ListeEmployees";
import SaisieVenteExportateur from "./pages/SaisieVenteExportateur";
import SaisieVenteClient from "./pages/SaisieVenteClient";
import Logs from "./pages/Logs";
import Login from "./pages/Login"; // Page de connexion

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simule l'authentification

  return (
    <Router>
      <div className="app">
        {/* Si non connecté, redirige vers /login */}
                {!isAuthenticated ? (
                  <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  </Routes>
                ) : (
                  <>
        {/* Sidebar */}
        <Sidebar />

        {/* Contenu principal */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout pageTitle="Dashboard" breadcrumb="/ Dashboard"><Dashboard /></Layout>} />
            <Route path="/produits" element={<Layout pageTitle="Produits" breadcrumb="/ Produits"><Produits /></Layout>} />
            <Route path="/contrats" element={<Layout pageTitle="Contrats" breadcrumb="/ Contrats"><Contrats /></Layout>} />
            <Route path="/gestion-patron" element={<Layout pageTitle="Gestion Patron" breadcrumb="/ Gestion Patron"><GestionPatron /></Layout>} />
            <Route path="/liste-employees" element={<Layout pageTitle="Liste Employées" breadcrumb="/ Liste Employees"><ListeEmployees /></Layout>} />
            <Route path="/saisie-vente-exportateur" element={<Layout pageTitle="Saisie Vente Exportateur" breadcrumb="/ Saisie Vente Exportateur"><SaisieVenteExportateur /></Layout>} />
            <Route path="/saisie-vente-client" element={<Layout pageTitle="Saisie Vente Client" breadcrumb="/ Saisie Vente Client"><SaisieVenteClient /></Layout>} />
            <Route path="/logs" element={<Layout pageTitle="Logs" breadcrumb="/ Logs"><Logs /></Layout>} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
