const express = require("express");
const axios = require("axios");

const router = express.Router();

/*
=====================================
CONTENT IMPROVEMENT
=====================================
*/
router.post("/improve", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const prompt = `
Improve the following content:
- Fix grammar
- Improve readability
- Improve tone
- Preserve the original meaning

Content:
${content}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt,
        stream: false,
      }
    );

    return res.json({
      success: true,
      improvedContent: response.data.response,
    });

  } catch (error) {
    console.error("Improve Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/*
=====================================
SEO METADATA GENERATOR
=====================================
*/
router.post("/seo-meta", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const prompt = `
Generate SEO metadata for the following content.

Return:
1. Meta Title
2. Meta Description
3. 5 SEO Keywords

Content:
${content}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt,
        stream: false,
      }
    );

    return res.json({
      success: true,
      seo: response.data.response,
    });

  } catch (error) {
    console.error("SEO Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/*
=====================================
CONTENT IDEA GENERATOR
=====================================
*/
router.post("/ideas", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Generate 10 creative blog content ideas about:

${topic}

Return as a numbered list.
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt,
        stream: false,
      }
    );

    return res.json({
      success: true,
      ideas: response.data.response,
    });

  } catch (error) {
    console.error("Ideas Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;