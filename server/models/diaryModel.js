const mongoose = require("mongoose");
const { Schema } = mongoose;
const path = require("path");

const diarySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: path.join(__dirname, "../public/images/defaultImage.png"),
    },
    title: {
      type: String,
      required: true,
    },
    content: [
      {
        type: String,
        required: true,
      },
    ],
    date: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Diary",
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = transformCreatedAt(ret.createdAt);
      },
    },
  }
);

// getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
const offset = new Date().getTimezoneOffset() * 60000;

function transformCreatedAt(date) {
  // new Date().toISOString(); //9시간이 증발..
  // 표준 = 영국시간 (우리나라와 영국은 9시간 차이)

  const today = new Date(date) - offset;

  const result = new Date(today).toISOString().split("T")[0];
  return result;
}

module.exports = mongoose.model("Diary", diarySchema);
