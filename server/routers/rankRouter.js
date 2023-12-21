const express = require("express");
const rankController = require("../controllers/rankController.js");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser.js");

// GET: /maps/:id - 특정 마커 조회
router.get("/", authenticateUser, rankController.getRank);

module.exports = router;
