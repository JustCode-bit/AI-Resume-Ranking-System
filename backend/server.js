const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/upload", upload.single("resume"), (req, res) => {
  res.json({
    message: "Resume Uploaded",
    file: req.file
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});