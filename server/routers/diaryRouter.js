const { Router } = require("express");
const diaryController = require("../controllers/diaryController");
const diaryAuthenticateUser = require("../middlewares/diaryAuthenticateUser");

const router = Router();

//일기 생성
router.post("/", diaryAuthenticateUser, diaryController.postDiary);

//일기 수정
router.put(`/:id`, diaryAuthenticateUser, diaryController.putDiary);

//일기 삭제
router.delete(`/:id`, diaryAuthenticateUser, diaryController.deleteDiary);

// 일기 조회
router.get("/", diaryAuthenticateUser, diaryController.getDiaries);

module.exports = router;
