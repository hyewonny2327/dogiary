const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routers/user-router");

const app = express();

dotenv.config();

//배포 시에는 끌 것
app.use(cors());

const DB_URL = process.env.ATLAS_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/auth", userRouter);

app.listen(process.env.PORT, ()=> {console.log("start server")});
db.on("connected", () => {
    console.log("DB 연결 성공");
});
db.on("error", (error) => {
    console.log("DB 연결 실패");
});