const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const mapRouter = require("../server/routes/mapRouter.js");
const dogRouter = require("../server/routes/dogRouter.js");
const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();
router.use("/", mapRouter);
router.use("/", dogRouter);

// /maps와 /dogs 경로를 combinedRouter로 처리
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
