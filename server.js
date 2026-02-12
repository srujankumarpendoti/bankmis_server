const express = require("express");
const cors = require("cors");
const policiesRoutes = require("./routes/policies");
const sopsRoutes = require("./routes/sops");

const PORT = process.env.PORT || 8080;
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", require("./routes/reports"));

app.use("/api", policiesRoutes);

app.use("/api/sops", sopsRoutes);
app.get("/", (req, res) => {
  res.send("Bank MIS Backend Running ✅");
});
app.listen(PORT, () => {
  console.log("Server running");
});
