import {
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  if (employees.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          👥
        </div>

        <h3>No employees found</h3>

        <p>
          Try changing your search or add a new employee.
        </p>

      </div>
    );
  }

  return (
    <div className="table-container">

      <table className="employee-table">

        <thead>
          <tr>
            <th>EMPLOYEE</th>
            <th>CONTACT</th>
            <th>DEPARTMENT</th>
            <th>DESIGNATION</th>
            <th>SALARY</th>
            <th>JOINING DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee._id}>

              <td>

                <div className="employee-name-cell">

                  <div className="employee-avatar">
                    {employee.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {employee.name}
                    </strong>
                  </div>

                </div>

              </td>

              <td>

                <div className="contact-cell">

                  <span>
                    <Mail size={13} />
                    {employee.email}
                  </span>

                  <span>
                    <Phone size={13} />
                    {employee.phone}
                  </span>

                </div>

              </td>

              <td>
                <span className="department-badge">
                  {employee.department}
                </span>
              </td>

              <td>
                {employee.designation}
              </td>

              <td className="salary-cell">
                {formatSalary(employee.salary)}
              </td>

              <td>
                {formatDate(employee.joiningDate)}
              </td>

              <td>

                <div className="table-actions">

                  <button
                    className="action-btn edit-btn"
                    title="Edit employee"
                    onClick={() =>
                      onEdit(employee)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-btn delete-btn"
                    title="Delete employee"
                    onClick={() =>
                      onDelete(employee._id)
                    }
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;