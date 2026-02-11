const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./bankmis_ready.db", (err) => {
  if (err) {
    console.error("❌ DB connection failed", err.message);
  } else {
    console.log("✅ Connected to existing bankmis_ready.db");
  }
});

module.exports = db;
