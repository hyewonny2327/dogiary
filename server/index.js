const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const mapRouter = require("./routers/mapRouter.js");
const dogRouter = require("./routers/dogRouter.js");
const diaryRouter = require("./routers/diaryRouter.js");
const weightRouter = require("./routers/weightRouter.js");
const memoRouter = require("./routers/memoRouter.js");
const foodRouter = require("./routers/foodRouter.js");
const medicalRouter = require("./routers/medicalRouter.js");
const userRouter = require("./routers/userRouter.js");
const rankRouter = require("./routers/rankRouter.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
<<<<<<< HEAD
=======

>>>>>>> a7970e23028bd194933b6d4fd19f318ac86f13e7
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/maps", mapRouter);
app.use("/api/diaries", diaryRouter);
app.use("/api/auth", userRouter);
app.use("/api/dogs", dogRouter);
app.use("/api/dogs", weightRouter, memoRouter, foodRouter, medicalRouter);
app.use("/api/rank", rankRouter);

const DB_URL = process.env.ATLAS_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB 연결 성공");
  } catch (err) {
    console.error("DB 연결 실패", err);
  }
};

app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.httpCode ?? 500;
  res.json({
    data: null,
    error: error.message,
  });
});
console.log("express application 준비가 완료되었습니다.");

// app.use(errorHandler);

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server is now open on port ${PORT} `);
  });
});
