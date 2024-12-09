import React, { useState } from "react";
import "./css/Settings.css";

const Settings = ({ isOpen, onClose, onAvatarChange }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null); // État pour l'avatar sélectionné

  // Gérer le changement d'avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedAvatar(reader.result); // Prévisualisation de l'image
      };
      reader.readAsDataURL(file);
    }
  };

  // Gérer l'enregistrement des paramètres
  const handleSave = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (selectedAvatar) {
      onAvatarChange(selectedAvatar); // Transmet l'avatar au parent (Sidebar)
    }
    onClose(); // Ferme la modal
  };

  if (!isOpen) return null; // Ne rien afficher si la modal est fermée

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-popup" onClick={(e) => e.stopPropagation()}>
        <h3>Paramètres utilisateurs</h3>
        <form className="modal-form" onSubmit={handleSave}>
          {/* Changer d'avatar */}
          <div className="form-group">
            <label>Changer d'Avatar</label>
            <div className="avatar-preview">
              <img
                src={selectedAvatar || "/assets/profile-picture/mrO.png"}
                alt="Avatar Preview"
                className="avatar-image"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Changer de mot de passe */}
          <div className="form-group">
            <label>Changer de mot de passe</label>
            <input type="password" placeholder="Nouveau mot de passe" />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" placeholder="Confirmer le mot de passe" />
          </div>

          {/* Boutons */}
          <div className="form-buttons">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
