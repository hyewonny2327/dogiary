const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routers/diaryApi.js");

dotenv.config();

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const DB_URL = process.env.ATLAS_URL;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("DB 연결 성공");
});
db.on("error", (error) => {
  console.log("DB 연결 실패");
});
