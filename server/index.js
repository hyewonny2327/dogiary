const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const mapRouter = require("./routers/mapRouter.js");
const dogRouter = require("./routers/dogRouter.js");
const diaryRouter = require("./routers/diaryRouter.js");
const {userRouter} = require("./routers/userRouter.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

const port = 8080;

router.use("/", mapRouter);
router.use("/", dogRouter);
router.use("/", diaryRouter);

app.use("/api", router);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.listen(8080, function () {
	console.log("severOpen");
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
