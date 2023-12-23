const { Router } = require("express");
const diaryController = require("../controllers/diaryController");

// 사용자 인증을 위한 미들웨어
const authenticateUser = require("../middlewares/authenticateUser");
const router = Router();
const { upload } = require("../utils/multer.js");

//일기 생성
router.post(
  "/",
  authenticateUser,
  upload.single("imageUrl"),
  diaryController.postDiary
);

//일기 수정
router.put(
  `/:id`,
  authenticateUser,
  upload.single("imageUrl"),
  diaryController.putDiary
);

//일기 삭제
router.delete(`/:id`, authenticateUser, diaryController.deleteDiary);

//(모든, 일간)일기 조회
router.get("/", authenticateUser, diaryController.getDiaries);

//(월간)일기 조회
router.get("/month", authenticateUser, diaryController.getMonthDiaries);

//커서 기반 페이징
router.get("/paging", authenticateUser, diaryController.getCursorDiaries);

module.exports = router;
