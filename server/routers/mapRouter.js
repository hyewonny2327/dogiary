const express = require("express");
const mapController = require("../controllers/mapController.js");
const router = express.Router();

// POST: /maps - 마커 추가
router.post("/maps", mapController.createMap);

// PUT: /dogs/:id - 마커 수정
router.put("/maps/:id", mapController.updateMap);

// DELETE: /dogs/:id - 마커 삭제
router.delete("/maps/:id", mapController.deleteMap);

// GET: /dogs/:id - 특정 마커 조회
router.get("/maps/:id", mapController.getOneMap);

router.get("/maps", mapController.getAllMaps);
module.exports = router;
