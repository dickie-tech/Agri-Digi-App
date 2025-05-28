// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { uploadFileToB2 } = require("./B2");

const app = express();
app.use(cors());

const upload = multer(); // memory storage

app.post("/upload-b2", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;

    const imageUrl = await uploadFileToB2(fileBuffer, fileName);

    res.json({ imageUrl });
  } catch (error) {
    console.error("B2 upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
