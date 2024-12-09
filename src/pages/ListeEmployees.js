import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./css/ListeEmployes.css";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../db/db";

const ListeEmployes = () => {
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

  // Charger les employés au démarrage
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Ajouter ou modifier un employé
  const handleSaveEmployee = async () => {
    if (editingEmployeeId) {
      const updatedEmployee = { ...newEmployee, id: editingEmployeeId };
      await updateEmployee(updatedEmployee);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployeeId ? updatedEmployee : emp
        )
      );
    } else {
      await addEmployee(newEmployee);
      const data = await getEmployees();
      setEmployees(data);
    }
    resetModal();
  };

  // Supprimer un employé
  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      await deleteEmployee(id);
      const data = await getEmployees();
      setEmployees(data);
    }
  };

  // Ouvrir la modal pour ajouter ou modifier
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

  // Réinitialiser la modal
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

  const formatPhoneNumber = (phone) => {
    phone = phone.replace(/\D/g, "");
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 7)}-${phone.slice(7)}`;
    }
    return phone;
  };

  const columnDefs = [
    { headerName: "Statut", field: "statut", resizable: false },
    { headerName: "Prénom", field: "prenom", resizable: false },
    { headerName: "Nom", field: "nom", resizable: false },
    {
      headerName: "Numéro de Téléphone",
      field: "telephone",
      resizable: false,
      valueFormatter: (params) => formatPhoneNumber(params.value),
    },
    { headerName: "Date d'Embauche", field: "embauche", resizable: false },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: () => <button>Test Bouton</button>,
      /*
      cellRendererFramework: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => openEditModal(params.data)}>Modifier</button>
          <button onClick={() => handleDeleteEmployee(params.data.id)}>Supprimer</button>
        </div>
      ),
      */
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
          defaultColDef={{ flex: 1, minWidth: 150, resizable: false }}
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
              <div className="form-group">
                <label>Numéro de Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formatPhoneNumber(newEmployee.telephone)}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      telephone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Date d'Embauche</label>
                <input
                  type="date"
                  name="embauche"
                  value={newEmployee.embauche}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, embauche: e.target.value })
                  }
                />
              </div>
              <div className="form-buttons">
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeEmployes;
