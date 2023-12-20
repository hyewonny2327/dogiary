const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const mapRouter = require("./routers/mapRouter.js");
const dogRouter = require("./routers/dogRouter.js");
const diaryRouter = require("./routers/diaryRouter.js");
const weightRouter = require("./routers/weightRouter.js");
const memoRouter = require("./routers/memoRouter.js");
const foodRouter = require("./routers/foodRouter.js");
const medicalRouter = require("./routers/medicalRouter.js");
const { userRouter } = require("./routers/userRouter.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/maps", mapRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/auth", userRouter);
app.use("/api/dogs", dogRouter);
app.use("/api/dogs", weightRouter, memoRouter, foodRouter, medicalRouter);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use((error, req, res, next) => {
	console.log(error);
	res.statusCode = error.httpCode ?? 500;
	res.json({
		data: null,
		error: error.message,
	});
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

app.listen(8080, function () {
	console.log("Server is now open!");
});
