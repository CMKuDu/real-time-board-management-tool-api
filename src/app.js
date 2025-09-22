const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const boardRoutes = require("./routes/board.routes");
const cardRoutes = require("./routes/card.routes");
const taskRoutes = require("./routes/task.routes");
const boardInvite = require("./routes/boardInvite.routes");


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
app.use("/board", boardRoutes)
app.use("/card", cardRoutes);
app.use("/task", taskRoutes);
app.use("/boardInvite", boardInvite);

module.exports = app;
