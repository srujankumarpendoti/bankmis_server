const router = require("express").Router();
const db = require("../database");

// 🔥 Reports for Previous Month (Employee Based)
router.get("/monthly/:empId/:yearMonth", (req, res) => {

  const empId = req.params.empId;
  const yearMonth = req.params.yearMonth; // example: 2025-01

  db.get(
    `SELECT Branch_ID FROM Employee_Master WHERE Employee_ID = ?`,
    [empId],
    (err, emp) => {

      if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const sql = `
        SELECT *
        FROM Daily_Banking_Data
        WHERE Branch_ID = ?
        AND strftime('%Y-%m', Date) = ?
        ORDER BY Date DESC
      `;

      db.all(sql, [emp.Branch_ID, yearMonth], (err, rows) => {
        res.json(rows);
      });
    }
  );
});


router.get("/annual/:empId", (req, res) => {

  const empId = req.params.empId;

  db.get(
    `SELECT Branch_ID FROM Employee_Master WHERE Employee_ID = ?`,
    [empId],
    (err, emp) => {

      const sql = `
        SELECT *
        FROM Daily_Banking_Data
        WHERE Branch_ID = ?
        AND Date IN (
          SELECT MAX(Date)
          FROM Daily_Banking_Data
          GROUP BY strftime('%Y-%m', Date)
        )
        ORDER BY Date DESC
      `;

      db.all(sql, [emp.Branch_ID], (err, rows) => {
        res.json(rows);
      });
    }
  );
});


module.exports = router;
