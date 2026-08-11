// const express = require("express");
import express from "express";

// const {
//   getEmployees,
//   getEmployeeById,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee,
// } = require("../controllers/employeeController");

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

//check the method and the url and then call the appropriate controller function

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.post("/", createEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

// module.exports = router;
export default router;