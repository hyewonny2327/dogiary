const mongoose = require("mongoose");
const { Schema } = mongoose;

const diarySchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Diary",
    timestamps: true,
  }
);

module.exports = mongoose.model("Diary", diarySchema);
