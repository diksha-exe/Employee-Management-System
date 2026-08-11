// Axios/API calls from frontend to backend
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getEmployees = async () => {
  const response = await API.get("/employees");

  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await API.get(
    `/employees/${id}`
  );

  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await API.post(
    "/employees",
    employeeData
  );

  return response.data;
};

export const updateEmployee = async (
  id,
  employeeData
) => {
  const response = await API.put(
    `/employees/${id}`,
    employeeData
  );

  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(
    `/employees/${id}`
  );

  return response.data;
};