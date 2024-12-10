import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./css/ListeEmployes.css";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../db/db";

const ListeEmployes = ({ onCreateUser }) => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    statut: "CDD",
    prenom: "",
    nom: "",
    telephone: "",
    embauche: "",
  });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleSaveEmployee = async () => {
    if (!newEmployee.prenom || !newEmployee.nom) {
      alert("Veuillez remplir les champs Prénom et Nom.");
      return;
    }

    const login = `${newEmployee.prenom[0].toLowerCase()}.${newEmployee.nom.toLowerCase()}`;
    const password = Math.random().toString(36).substring(2, 10);

    if (editingEmployeeId) {
      const updatedEmployee = { ...newEmployee, id: editingEmployeeId, login, password };
      await updateEmployee(updatedEmployee);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployeeId ? updatedEmployee : emp
        )
      );
    } else {
      const newEmp = { ...newEmployee, login, password };
      await addEmployee(newEmp);
      onCreateUser(newEmp); // Mise à jour dans Gestion.js
      const data = await getEmployees();
      setEmployees(data);
    }
    resetModal();
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      await deleteEmployee(id);
      const data = await getEmployees();
      setEmployees(data);
    }
  };

  const openEditModal = (employee = null) => {
    if (employee) {
      setNewEmployee(employee);
      setEditingEmployeeId(employee.id);
    } else {
      setNewEmployee({
        statut: "CDD",
        prenom: "",
        nom: "",
        telephone: "",
        embauche: "",
      });
      setEditingEmployeeId(null);
    }
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setNewEmployee({
      statut: "CDD",
      prenom: "",
      nom: "",
      telephone: "",
      embauche: "",
    });
    setEditingEmployeeId(null);
  };

  const columnDefs = [
    { headerName: "Statut", field: "statut" },
    { headerName: "Prénom", field: "prenom" },
    { headerName: "Nom", field: "nom" },
    { headerName: "Numéro de Téléphone", field: "telephone" },
    { headerName: "Date d'Embauche", field: "embauche" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => openEditModal(params.data)}>Modifier</button>
          <button onClick={() => handleDeleteEmployee(params.data.id)}>Supprimer</button>
        </div>
      ),
    },
  ];

  return (
    <div className="liste-employes-container">
      <h2>Liste Employés</h2>
      <button onClick={() => openEditModal()}>Ajouter un Employé(e)</button>
      <div className="ag-theme-alpine" style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, minWidth: 150 }}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-popup">
            <h3>{editingEmployeeId ? "Modifier" : "Ajouter"} un Employé</h3>
            <form>
              <div className="form-group">
                <label>Statut</label>
                <select
                  name="statut"
                  value={newEmployee.statut}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, statut: e.target.value })
                  }
                >
                  <option value="Patron">Patron</option>
                  <option value="Co-Patron">Co-Patron</option>
                  <option value="Responsable">Responsable</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={newEmployee.prenom}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, prenom: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={newEmployee.nom}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, nom: e.target.value })
                  }
                />
              </div>
              <button type="button" onClick={handleSaveEmployee}>
                {editingEmployeeId ? "Modifier" : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={resetModal}
                className="cancel-btn"
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeEmployes;
