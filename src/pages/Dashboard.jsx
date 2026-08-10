import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeModal from "../components/EmployeeModal";
import SearchBar from "../components/SearchBar";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch employees
  // -----------------------------

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // -----------------------------
  // Add employee
  // -----------------------------

  const handleAddEmployee = async (employeeData) => {
    try {
      setError("");

      const newEmployee = await createEmployee(employeeData);

      setEmployees((prev) => [newEmployee, ...prev]);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to add employee."
      );
    }
  };

  // -----------------------------
  // Edit employee
  // -----------------------------

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      setError("");

      const updatedEmployee = await updateEmployee(
        editingEmployee._id,
        employeeData
      );

      setEmployees((prev) =>
        prev.map((employee) =>
          employee._id === updatedEmployee._id
            ? updatedEmployee
            : employee
        )
      );

      setEditingEmployee(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update employee."
      );
    }
  };

  // -----------------------------
  // Delete employee
  // -----------------------------

  const handleDeleteEmployee = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteEmployee(id);

      setEmployees((prev) =>
        prev.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError("Failed to delete employee.");
    }
  };

  // -----------------------------
  // Filter employees
  // -----------------------------

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, department]);

  // -----------------------------
  // Modal submit
  // -----------------------------

  const handleModalSubmit = (employeeData) => {
    if (editingEmployee) {
      return handleUpdateEmployee(employeeData);
    }

    return handleAddEmployee(employeeData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  // -----------------------------
  // Departments
  // -----------------------------

  const departments = [
    "All",
    ...new Set(
      employees.map((employee) => employee.department)
    ),
  ];

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="dashboard-content">

          {/* Page heading */}

          <div className="page-heading">

            <div>
              <h1>Employee Management</h1>

              <p>
                Manage your organization's employees
              </p>
            </div>

            <button
              className="add-employee-btn"
              onClick={() => {
                setEditingEmployee(null);
                setIsModalOpen(true);
              }}
            >
              <span>+</span>
              Add Employee
            </button>

          </div>

          {/* Error */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Stats */}

          <StatsCards employees={employees} />

          {/* Employee section */}

          <section className="employee-section">

            <div className="section-header">

              <div>
                <h2>Employees</h2>

                <p>
                  View and manage employee records
                </p>
              </div>

            </div>

            {/* Search */}

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              department={department}
              setDepartment={setDepartment}
              departments={departments}
            />

            {/* Table */}

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading employees...</p>
              </div>
            ) : (
              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEditClick}
                onDelete={handleDeleteEmployee}
              />
            )}

          </section>

        </div>

      </main>

      {/* Modal */}

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        employee={editingEmployee}
      />

    </div>
  );
}

export default Dashboard;