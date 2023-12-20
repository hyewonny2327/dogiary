const mapService = require("../services/mapService.js");

const mapController = {
  async createMap(req, res) {
    const mapData = req.body;
    const mapProfile = await mapService.createMap(mapData);

    res.status(201).json({
      error: null,
      data: mapProfile,
    });
  },
  async updateMap(req, res) {
    const mapData = req.body;
    const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
    const updateMapProfile = await mapService.updateMap(id, mapData);

    res.status(201).json({
      error: null,
      data: updateMapProfile,
    });
  },
  async deleteMap(req, res) {
    const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
    const deleteMap = await mapService.deleteMap(id);

    res.status(204).json({
      error: null,
      data: deleteMap,
    });
  },

  async getOneMap(req, res) {
    console.log("들어옴?");
    const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
    const mapProfile = await mapService.getOneMap(id);

    res.json({
      error: null,
      data: mapProfile,
    });
  },
  async getAllMaps(req, res) {
    const allMaps = await mapService.getAllMaps();
    console.log(allMaps);

    res.json({
      error: null,
      data: allMaps,
    });
  },
  async getMapsByTag(req, res) {
    console.log(req.params.tag);
    const tagName = req.params.tag;
    const maps = await mapService.getMapsByTag(tagName);
    res.json({
      error: null,
      data: maps,
    });
  },
};

module.exports = mapController;
