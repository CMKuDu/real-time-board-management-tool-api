const express = require("express");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Real-Time Board Management API 🚀" });
});

module.exports = router;
