import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./css/GestionUtilisateurs.css";

const GestionUtilisateurs = () => {
  // Initialisation des utilisateurs avec un utilisateur de base
  const [users, setUsers] = useState([
    { id: 1, login: "admin", password: "admin" }, // Utilisateur de base
  ]);

  // Définition des colonnes du tableau
  const columnDefs = [
    { headerName: "Login", field: "login", sortable: true, filter: true },
    { headerName: "Mot de Passe", field: "password", editable: true },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => handleEditUser(params.data)}>Modifier</button>
          <button onClick={() => handleDeleteUser(params.data.id)}>Supprimer</button>
        </div>
      ),
    },
  ];

  // Fonction pour modifier un utilisateur
  const handleEditUser = (user) => {
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (id) => {
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
        />
      </div>
    </div>
  );
};

export default GestionUtilisateurs;
