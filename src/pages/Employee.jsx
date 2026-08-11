import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEmployeeById } from "../services/employeeService";

function Employee() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEmployeeById(id);

        setEmployee(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="employee-page">
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-page">
        <p>{error}</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="employee-page">
        <p>Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="employee-page">

      <div className="employee-page-heading">
        <h1>Employee Details</h1>

        <p>
          View employee information
        </p>
      </div>

      <section className="employee-info-card">

        <h2>{employee.name}</h2>

        <div className="employee-info-grid">

          <div>
            <span>Name</span>
            <strong>{employee.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{employee.email}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{employee.phone}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{employee.department}</strong>
          </div>

          <div>
            <span>Designation</span>
            <strong>{employee.designation}</strong>
          </div>

          <div>
            <span>Salary</span>
            <strong>{employee.salary}</strong>
          </div>

          <div>
            <span>Joining Date</span>
            <strong>{employee.joiningDate}</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Employee;