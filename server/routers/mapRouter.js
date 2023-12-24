const express = require("express");
const mapController = require("../controllers/mapController");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser.js");
const { upload } = require("../utils/multer.js");
// POST: /maps - 마커 추가
router.post(
	"/",
	authenticateUser,
	upload.single("imageUrl"),
	mapController.postMap
);
// PUT: /maps/:id - 마커 수정
router.put(
	"/:id",
	authenticateUser,
	upload.single("imageUrl"),
	mapController.putMap
);
// GET: /maps/:id - 특정 마커 조회
router.get("/:id", mapController.getOneMap);
// GET: /maps/:id - 특정 마커 조회
router.get("/rank", mapController.getRank);
// GET: /maps - 마커 전체 조회 또는 태그별 조회
// 내가 등록한 맵정보 /maps?myMaps=true
router.get("/", authenticateUser, mapController.getMaps);

// DELETE: /maps/:id - 마커 삭제
router.delete("/:id", authenticateUser, mapController.deleteMap);
module.exports = router;
