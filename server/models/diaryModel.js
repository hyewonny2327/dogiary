const mongoose = require("mongoose");
const { Schema } = mongoose;
const path = require("path");
const { format } = require("date-fns");

const diarySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrl: [
      {
        type: String,
        default: path.join(__dirname, "../public/images/defaultImage.png"),
      },
    ],
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
  }
);
// getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환

diarySchema.pre("save", function (next) {
  const offset = new Date().getTimezoneOffset() * 60000;
  this.createdAt = format(
    new Date(this.createdAt - offset),
    "yyyy-MM-dd'T'HH:mm:ss"
  );
  next();
});
module.exports = mongoose.model("Diary", diarySchema);



// // 표준 = 영국시간 (우리나라와 영국은 9시간 차이)
