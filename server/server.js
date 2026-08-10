// Create the Express server
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// connect to databse
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();

connectDB();

const app = express();

//backend on one port and frontend on another port, so we need to enable CORS to allow cross-origin requests
app.use(cors());

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