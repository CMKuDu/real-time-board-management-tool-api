const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes")

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express App!");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes)
module.exports = app;
