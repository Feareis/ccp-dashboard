import { openDB } from "idb";

// Ouvrir ou créer la base de données
export const initDB = async () => {
  const db = await openDB("EmployeesDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("employees")) {
        db.createObjectStore("employees", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

// Ajouter un employé
export const addEmployee = async (employee) => {
  const db = await initDB();
  await db.add("employees", employee);
};

// Récupérer tous les employés
export const getEmployees = async () => {
  const db = await initDB();
  return await db.getAll("employees");
};

// Mettre à jour un employé
export const updateEmployee = async (employee) => {
  const db = await initDB();
  await db.put("employees", employee);
};

// Supprimer un employé
export const deleteEmployee = async (id) => {
  const db = await initDB();
  await db.delete("employees", id);
};
