const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const querystring = require("querystring"); // Import querystring module

app.use(cors());
app.use(express.json());

const DEEPL_API_KEY = "b19ee7bb-686d-8fb6-2580-ec4a290d0b09:fx"; // Replace with your actual API key

app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const data = querystring.stringify({
      auth_key: DEEPL_API_KEY,
      text: text,
      target_lang: targetLang,
    });

    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      data
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "DeepL API error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Error while translating", error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
