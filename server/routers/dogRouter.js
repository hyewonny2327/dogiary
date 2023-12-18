const express = require("express");
const dogController = require("../controllers/dogController.js");
const router = express.Router();

// POST: /dogs - 새로운 강아지 생성
router.post("/dogs", dogController.createDog);

// PUT: /dogs/:id - 강아지 수정
router.put("/dogs/:id", dogController.updateDog);

// DELETE: /dogs/:id - 강아지 삭제
router.delete("/dogs/:id", dogController.deleteDog);

// GET: /dogs/:id - 강아지 조회
router.get("/dogs/:id", dogController.getOneDog);

module.exports = router;
