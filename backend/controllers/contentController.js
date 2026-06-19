const db = require("../database/db");

// CREATE CONTENT
exports.createContent = (req, res) => {
  const { title, body, tags } = req.body;

  db.run(
    `INSERT INTO contents (title, body, tags)
     VALUES (?, ?, ?)`,
    [title, body, tags],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        id: this.lastID,
      });
    }
  );
};

// GET ALL CONTENT
exports.getAllContent = (req, res) => {
  db.all(
    `SELECT * FROM contents ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(rows);
    }
  );
};

// GET SINGLE CONTENT
exports.getContentById = (req, res) => {
  db.get(
    `SELECT * FROM contents WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(row);
    }
  );
};

// UPDATE CONTENT
exports.updateContent = (req, res) => {
  const { title, body, tags } = req.body;

  db.run(
    `UPDATE contents
     SET title=?, body=?, tags=?
     WHERE id=?`,
    [title, body, tags, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        updatedRows: this.changes,
      });
    }
  );
};

// DELETE CONTENT
exports.deleteContent = (req, res) => {
  db.run(
    `DELETE FROM contents WHERE id=?`,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        deletedRows: this.changes,
      });
    }
  );
};