const express = require("express");
const mapController = require("../controllers/mapController.js");
const router = express.Router();

// POST: /maps - 마커 추가
router.post("/maps", mapController.createMap);

// PUT: /maps/:id - 마커 수정
router.put("/maps/:id", mapController.updateMap);

// DELETE: /maps/:id - 마커 삭제
router.delete("/maps/:id", mapController.deleteMap);

// GET: /maps/:id - 특정 마커 조회
router.get("/maps/:id", mapController.getOneMap);

// GET: /maps - 마커 전체 조회
router.get("/maps", mapController.getAllMaps);

// GET: /maps/:tag -태그별 마커 조회
router.get("/maps/tags/:tag", mapController.getMapsByTag);

module.exports = router;
