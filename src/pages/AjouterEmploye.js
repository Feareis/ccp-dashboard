import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AjouterEmploye.css";

const AjouterEmploye = () => {
  const [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    quota: "",
    quotaPlus: "",
    primePropre: "",
    taxeSale: "",
    vacances: "",
    telephone: "",
    embauche: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nouvel employé :", employee);

    // Simule l'ajout de l'employé (à remplacer par une requête API ou autre traitement)
    alert("Employé ajouté avec succès !");
    navigate("/liste-employes"); // Redirige vers la liste des employés
  };

  return (
    <div className="ajouter-employe-container">
      <h2>Ajouter un Employé</h2>
      <form onSubmit={handleSubmit} className="ajouter-employe-form">
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={employee.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={employee.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quota</label>
          <input
            type="number"
            name="quota"
            value={employee.quota}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quota+</label>
          <input
            type="number"
            name="quotaPlus"
            value={employee.quotaPlus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prime Argent Propre</label>
          <input
            type="number"
            name="primePropre"
            value={employee.primePropre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Taxe Argent Sale</label>
          <input
            type="number"
            name="taxeSale"
            value={employee.taxeSale}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Vacances</label>
          <input
            type="text"
            name="vacances"
            value={employee.vacances}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Numéro de Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={employee.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date d'Embauche</label>
          <input
            type="date"
            name="embauche"
            value={employee.embauche}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter Employé</button>
      </form>
    </div>
  );
};

export default AjouterEmploye;
