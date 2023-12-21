const multer = require("multer");
const fs = require("fs");

const storageOptions = multer.diskStorage({
    filename: function (req, file, callback) {
        const extension = file.originalname.split(".").pop();
        callback(null, Date.now() + "." + extension);
    },
    destination: function (req, file, callback) {
        callback(null, "public/images");
    },
});

const fileFilter = function (req, file, callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("이미지 파일만 업로드 가능합니다."));
    }
    callback(null, true);
};

const upload = multer({ storage: storageOptions, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const deleteImage = function (filePath) {
    if(filePath) {
        try {
            fs.unlinkSync(filePath);
            console.log("이미지가 성공적으로 삭제되었습니다.");
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = { upload, deleteImage };