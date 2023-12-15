import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "defaultImage.png",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = model("users", UserSchema);
export { User };
