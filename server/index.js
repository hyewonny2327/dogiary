import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";

const app = express();

//배포 시에는 끌 것
app.use(cors());

const DB_URL = process.env.ATLAS_URL;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("DB 연결 성공");
});
db.on("error", (error) => {
    console.log("DB 연결 실패");
});