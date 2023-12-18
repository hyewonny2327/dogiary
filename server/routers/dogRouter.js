const express = require("express");
const dogController = require("../controllers/dogController.js");
const router = express.Router();
const weightController = require("../controllers/weightController.js");

// POST: /dogs - 새로운 강아지 생성
router.post("/", dogController.postDog);

// PUT: /dogs/:id - 강아지 수정
router.put("/:id", dogController.putDog);

// DELETE: /dogs/:id - 강아지 삭제
router.delete("/:id", dogController.deleteDog);

// GET: /dogs/:id - 강아지 조회
router.get("/:id", dogController.getOneDog);

module.exports = router;
