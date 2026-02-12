const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database"); // your sqlite connection

// ROUTES
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const reportsRoutes = require("./routes/reports");
const policiesRoutes = require("./routes/policies");
const sopsRoutes = require("./routes/sops");

const app = express();

/* =========================
   🔥 PORT FOR RAILWAY
========================= */
const PORT = process.env.PORT || 5000;

/* =========================
   🔥 CORS CONFIG
========================= */
app.use(
  cors({
    origin: "*", // You can restrict later
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   🔥 HEALTH CHECK ROUTE
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Gayatri Bank MIS Backend Running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

/* =========================
   🔥 API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/policies", policiesRoutes);
app.use("/api/sops", sopsRoutes);

/* =========================
   🔥 404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found",
  });
});

/* =========================
   🔥 ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

/* =========================
   🚀 START SERVER
========================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
