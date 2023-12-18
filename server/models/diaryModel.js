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
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = transformCreatedAt(ret.createdAt);
        delete ret.__v;
      },
    },
  }
);

const offset = new Date().getTimezoneOffset() * 60000;

function transformCreatedAt(date) {
  const today = new Date(date) - offset;

  const result = new Date(today).toISOString().split("T")[0];
  return result;
}

module.exports = mongoose.model("Diary", diarySchema);
