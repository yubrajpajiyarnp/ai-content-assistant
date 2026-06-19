const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./content.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("SQLite Connected");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;