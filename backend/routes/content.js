const express = require("express");
const router = express.Router();

const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

router.post("/", createContent);
router.get("/", getAllContent);
router.get("/:id", getContentById);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;