const express = require("express");
const mapController = require("../controllers/mapController.js");
const router = express.Router();

// GET: /maps/:id - 특정 마커 조회
router.get("/:id", mapController.getOneMap);

// GET: /maps - 마커 전체 조회 또는 태그별 조회
router.get("/", mapController.getMaps);

// POST: /maps - 마커 추가
router.post("/", mapController.postMap);

// PUT: /maps/:id - 마커 수정
router.put("/:id", mapController.putMap);

// DELETE: /maps/:id - 마커 삭제
router.delete("/:id", mapController.deleteMap);

module.exports = router;
