const express = require("express");
const router = express.Router();
const weightController = require("../controllers/weightController.js");
const authenticateUser = require("../middlewares/authenticateUser.js");

// POST: /dogs/:id/weights - 새로운 몸무게 추가
router.post("/:id/weights", authenticateUser, weightController.postWeight);

// GET: /dogs/:id/weights/:weightId - 몸무게리스트 조회
router.get("/:id/weights", authenticateUser, weightController.getWeightById);

// PUT: /dogs/:id/weights/:weightId - 몸무게 정보 업데이트
router.put(
	"/:id/weights/:weightId",
	authenticateUser,
	weightController.putWeight
);

// DELETE: /dogs/:id/weights/:weightId - 몸무게 삭제
router.delete(
	"/:id/weights/:weightId",
	authenticateUser,
	weightController.deleteWeight
);
module.exports = router;
