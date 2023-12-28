const express = require('express');
const dogController = require('../controllers/dogController.js');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser.js");
const { validatePostDogInfo, validateUpdateDogInfo } = require("../middlewares/validatorDog.js");

const { upload } = require("../utils/multer.js");
// POST: /dogs - 새로운 강아지 생성
router.post(
	"/",
	authenticateUser,
	validatePostDogInfo,
	upload.single("imageUrl"),
	dogController.postDog
);

// PUT: /dogs/:id - 강아지 수정
router.put(
	"/:id",
	authenticateUser,
	validateUpdateDogInfo,
	upload.single("imageUrl"),
	dogController.putDog
);

// DELETE: /dogs/:id - 강아지 삭제
router.delete('/:id', authenticateUser, dogController.deleteDog);

// GET: /dogs/:id - 강아지 조회
router.get("/", authenticateUser, dogController.getDog);

module.exports = router;
