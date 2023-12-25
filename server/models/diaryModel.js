const mongoose = require("mongoose");
const { Schema } = mongoose;
const path = require("path");

const diarySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imageUrls: [
      {
        type: String,
        default: path.join(__dirname, "../public/images/defaultImage.png"),
      },
    ],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Diary", diarySchema);

// // 표준 = 영국시간 (우리나라와 영국은 9시간 차이)
