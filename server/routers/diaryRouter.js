const { Router } = require("express");
const diaryController = require("../controllers/diaryController");
const router = Router();

//다이어리 생성
router.post("/diary", diaryController.diarySave);

//다이어리 수정
router.put(`/diary/:id`, diaryController.diaryUpdate);

//다이어리 삭제
router.delete(`/diary/:id`, diaryController.diaryDelete);

//다이어리 모두 조회
router.get("/diary", diaryController.diaryGetAll);

//다이어리 월별 조회
router.get("/diary/month", diaryController.diaryGetMonth);

module.exports = router;
