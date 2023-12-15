const { Router } = require("express");
const diaryController = require("../controllers/diaryController");
const router = Router();

router.post("/", diaryController.diarySave);

router.put(`/:id`, diaryController.diaryUpdate);

router.delete(`/:id`, diaryController.diaryDelete);

router.get("/", diaryController.diaryGetAll);

module.exports = router;
