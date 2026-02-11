const router = require("express").Router();
const db = require("../database");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { employeeId, password } = req.body;

  db.get(
    "SELECT * FROM Employee_Master WHERE Employee_ID = ?",
    [employeeId],
    (err, user) => {
      if (err) return res.status(500).send("DB error");

      if (!user || user.Password !== password) {
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign(user, "BANK_SECRET");

      res.json({ token, user });
    }
  );
});

module.exports = router;
