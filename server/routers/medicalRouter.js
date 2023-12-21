const express = require("express");
const router = express.Router();
const medicalController = require("../controllers/medicalController.js");
const authenticateUser = require("../middlewares/authenticateUser.js");

// POST: /dogs/:id/weights - 새로운 몸무게 추가
router.post("/:id/medicals", authenticateUser, medicalController.postMedical);

// GET: /dogs/:id/medicals - 특정 몸무게 조회
router.get(
	"/:id/medicals/",
	authenticateUser,
	medicalController.getMedicalById
);

// PUT: /dogs/:id/weights/:weightId - 몸무게 정보 업데이트
router.put(
	"/:id/medicals/:medicalId",
	authenticateUser,
	medicalController.putMedical
);

// DELETE: /dogs/:id/weights/:weightId - 몸무게 삭제
router.delete(
	"/:id/medicals/:medicalId",
	authenticateUser,
	medicalController.deleteMedical
);
module.exports = router;
