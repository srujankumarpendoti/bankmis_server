const router = require("express").Router();
const db = require("../database");

router.get("/summary/:empId", (req, res) => {

  const empId = req.params.empId;

  // 🔥 Get employee branch first
  db.get(
    "SELECT Branch_ID FROM Employee_Master WHERE Employee_ID = ?",
    [empId],
    (err, emp) => {

      if (!emp) {
        return res.status(404).send("Employee not found");
      }

      const branchId = emp.Branch_ID;

      // 🔥 Fetch MIS ONLY for that branch
      const sql = `
        SELECT
          SUM(CA_Deposits + SA_Deposits + TD_Deposits) AS Deposits,
          SUM(Gold_Loans + Agri_Loans + DL_Loans + Other_Loans) AS Loans,
          SUM(NPA) AS NPA,
          SUM(Overdue) AS Overdue
        FROM Daily_Banking_Data
        WHERE Branch_ID = ?
      `;

      db.get(sql, [branchId], (err, row) => {
        res.json(row);
      });
    }
  );
});

module.exports = router;
 