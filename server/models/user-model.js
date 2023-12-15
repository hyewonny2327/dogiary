const mongoose = require("mongoose");
const path = require("path");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        nickName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: path.join(__dirname, "../public/defaultImage.png"),
        },
    },
    {
        collection: "Users",
        timestamps: true,
    }
);

const User = mongoose.model("Users", userSchema);
module.exports = { User };