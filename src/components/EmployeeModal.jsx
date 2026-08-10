import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
};

function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate
          ? employee.joiningDate.split("T")[0]
          : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [employee, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      await onSubmit({
        ...formData,
        salary: Number(formData.salary),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <div className="employee-modal">

        <div className="modal-header">

          <div>
            <h2>
              {employee
                ? "Edit Employee"
                : "Add Employee"}
            </h2>

            <p>
              {employee
                ? "Update employee information"
                : "Add a new employee to your organization"}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form
          className="employee-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter employee name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="employee@example.com"
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select department
                </option>

                <option value="Engineering">
                  Engineering
                </option>

                <option value="Marketing">
                  Marketing
                </option>

                <option value="Human Resources">
                  Human Resources
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Operations">
                  Operations
                </option>
              </select>

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Designation</label>

              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                placeholder="e.g. Software Engineer"
              />
            </div>

            <div className="form-group">
              <label>Annual Salary</label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="0"
                placeholder="Enter annual salary"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Joining Date</label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : employee
                ? "Save Changes"
                : "Add Employee"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EmployeeModal;