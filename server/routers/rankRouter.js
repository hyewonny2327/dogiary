const express = require("express");
const rankController = require("../controllers/rankController.js");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser.js");

router.get("/", authenticateUser, rankController.getRank);

module.exports = router;
