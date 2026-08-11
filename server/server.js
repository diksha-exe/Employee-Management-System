// Create the Express server

// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// // connect to databse
// const connectDB = require("./config/db");
// const employeeRoutes = require("./routes/employeeRoutes");

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

//.env file, parses the variables inside it, and adds them to process.env.
// This allows your app to securely use private keys, database URLs,
// and ports without writing them directly into your code.
dotenv.config();

connectDB();

//This app object lets you set up routes, configure middleware, and start your web server
const app = express();

//backend on one port and frontend on another port, so we need to enable CORS to allow cross-origin requests
app.use(cors());

//This allows Express to understand JSON sent by React.
app.use(express.json());

//express server setup
app.get("/", (req, res) => {
  
  res.json({
    message: "Employee Management API is running",
  });
});

//if backend url is this then move to employeeRoute
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

//actively listen to the port and log the message to the console
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});