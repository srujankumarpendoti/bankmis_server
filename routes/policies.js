const router = require("express").Router();
const db = require("../database");

// GET POLICIES
router.get("/list", (req, res) => {

  const { department, subDept, month, year } = req.query;

  let sql = `
    SELECT *
    FROM Policies_SOP_Master
    WHERE Type = 'POLICY'
  `;

  const params = [];

  if (department && department !== "") {
    sql += " AND Department = ?";
    params.push(department);
  }

  if (subDept && subDept !== "") {
    sql += " AND Sub_Department = ?";
    params.push(subDept);
  }

  if (month && month !== "") {
    sql += " AND Month = ?";
    params.push(month);
  }

  if (year && year !== "") {
    sql += " AND Year = ?";
    params.push(year);
  }

  sql += " ORDER BY Year DESC, Month DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

module.exports = router;
