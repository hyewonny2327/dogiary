const { Router } = require("express");
const diaryController = require("../controllers/diaryController");
const authenticateUser = require("../middlewares/authenticateUser.js");

const router = Router();

//일기 생성
router.post("/", authenticateUser, diaryController.postDiary);

//일기 수정
router.put(`/:id`, authenticateUser, diaryController.putDiary);

//일기 삭제
router.delete(`/:id`, authenticateUser, diaryController.deleteDiary);

// 일기 조회
router.get("/", authenticateUser, diaryController.getDiaries);

module.exports = router;
