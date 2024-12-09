import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBoxOpen,
  faFileContract,
  faUserTie,
  faUsers,
  faTruckLoading,
  faClipboardList,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import "./css/Sidebar.css";
import Settings from "./Settings";

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [avatar, setAvatar] = useState("/assets/profile-picture/mrO.png"); // État pour l'avatar

  // Ouvrir/fermer la modal
  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Mettre à jour l'avatar
  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <nav className="sidebar">
      <h1 className="sidebar-title">La Cantina</h1>
      <div className="sidebar-divider"></div>

      {/* Profil */}
      <div className="profile-box" onClick={toggleSettingsModal}>
        <img src={avatar} alt="Profil" className="profile-picture" />
        <div className="profile-name">Patron - Mr O</div>
      </div>

      {/* Navigation */}
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            <FontAwesomeIcon icon={faChartBar} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/produits" activeClassName="active">
            <FontAwesomeIcon icon={faBoxOpen} /> Produits
          </NavLink>
        </li>
        <li>
          <NavLink to="/contrats" activeClassName="active">
            <FontAwesomeIcon icon={faFileContract} /> Contrats
          </NavLink>
        </li>
        <li>
          <NavLink to="/gestion-patron" activeClassName="active">
            <FontAwesomeIcon icon={faUserTie} /> Gestion
          </NavLink>
        </li>
        <li>
          <NavLink to="/liste-employees" activeClassName="active">
            <FontAwesomeIcon icon={faUsers} /> Liste Employées
          </NavLink>
        </li>
        <li>
          <NavLink to="/saisie-vente-exportateur" activeClassName="active">
            <FontAwesomeIcon icon={faTruckLoading} /> Vente Exportateur
          </NavLink>
        </li>
        <li>
          <NavLink to="/saisie-vente-client" activeClassName="active">
            <FontAwesomeIcon icon={faClipboardList} /> Vente Client
          </NavLink>
        </li>
        <li>
          <NavLink to="/logs" activeClassName="active">
            <FontAwesomeIcon icon={faReceipt} /> Logs
          </NavLink>
        </li>
      </ul>

      {/* Modal Settings */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={toggleSettingsModal}
        onAvatarChange={handleAvatarChange}
      />
    </nav>
  );
};

export default Sidebar;
