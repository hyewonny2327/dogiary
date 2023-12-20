const express = require("express");
const router = express.Router();
const memoController = require("../controllers/memoController.js");
const authenticateUser = require("../middlewares/authenticateUser.js");

// POST
router.post("/:id/memos", authenticateUser, memoController.postMemo);

// GET:
router.get("/:id/memos", authenticateUser, memoController.getMemoById);

// PUT:
router.put("/:id/memos/:memoId", authenticateUser, memoController.putMemo);

// DELETE:
router.delete(
	"/:id/memos/:memoId",
	authenticateUser,
	memoController.deleteMemo
);
module.exports = router;
