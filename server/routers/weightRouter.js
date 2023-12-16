const express = require("express");
const dogController = require("../controllers/dogController.js");
const router = express.Router();
const weightController = require("../controllers/weightController.js");

// POST: /dogs/:id/weights - 새로운 몸무게 추가
router.post("/:id/weights", weightController.createWeight);

// GET: /dogs/:id/weights/:weightId - 특정 몸무게 조회
router.get("/:id/weights/:weightId", weightController.getWeightById);

// PUT: /dogs/:id/weights/:weightId - 몸무게 정보 업데이트
router.put("/:id/weights/:weightId", weightController.updateWeight);

// DELETE: /dogs/:id/weights/:weightId - 몸무게 삭제
router.delete("/:id/weights/:weightId", weightController.deleteWeight);
module.exports = router;
