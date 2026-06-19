const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    let extractedText = "";

    const filePath = req.file.path;

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);

      extractedText = pdfData.text;
    }

    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      extractedText = result.value;
    }

    else if (req.file.mimetype === "text/plain") {
      extractedText = fs.readFileSync(
        filePath,
        "utf8"
      );
    }

    return res.json({
      success: true,
      text: extractedText,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;