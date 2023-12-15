// import express from "express";

// import dotenv from "dotenv";
// dotenv.config();
// import mongoose from "mongoose";
// import cors from "cors";
// import router from "../server/routes/dogRouter.js"; // 경로는 실제 파일의 위치에 맞게 수정해주세요.
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("../server/routes/dogRouter.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(3000, function () {
	console.log("severOpen");
});
const DB_URL = process.env.ATLAS_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("connected", () => {
	console.log(`DB 연결 성공`);
});
db.on("error", (error) => {
	console.log("DB 연결 실패");
});
