const { Router } = require("express");
const diaryController = require("../controllers/diaryController");
const router = Router();

router.post("/diary", diaryController.diarySave);

router.put(`/diary/:id`, diaryController.diaryUpdate);

router.delete(`/diary/:id`, diaryController.diaryDelete);

router.get("/diary", diaryController.diaryGetAll);

module.exports = router;
