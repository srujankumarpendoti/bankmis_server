const express = require("express");
const cors = require("cors");
const policiesRoutes = require("./routes/policies");
const sopsRoutes = require("./routes/sops");


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});

