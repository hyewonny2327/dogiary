const express = require("express");
const mapController = require("../controllers/mapController.js");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser.js");
// GET: /maps/myMaps - 내 맵 정보 가져오기
// router.get("/", authenticateUser, mapController.getMyMaps);

// GET: /maps/:id - 특정 마커 조회
router.get("/:id", mapController.getOneMap);

// GET: /maps - 마커 전체 조회 또는 태그별 조회
// 내가 등록한 맵정보 /maps?myMaps=true
router.get("/", authenticateUser, mapController.getMaps);

// POST: /maps - 마커 추가
router.post("/", authenticateUser, mapController.postMap);

// PUT: /maps/:id - 마커 수정
router.put("/:id", authenticateUser, mapController.putMap);

// DELETE: /maps/:id - 마커 삭제
router.delete("/:id", authenticateUser, mapController.deleteMap);
module.exports = router;
