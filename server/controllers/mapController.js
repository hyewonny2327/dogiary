const mapService = require("../services/mapService.js");

const mapController = {
	async createMap(req, res) {
		try {
			const mapData = req.body;
			const mapProfile = await mapService.createMap(mapData);

			res.status(201).json({
				error: null,
				data: mapProfile,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},

	async updateMap(req, res) {
		try {
			const mapData = req.body;
			const id = req.params.id;
			const updateMapProfile = await mapService.updateMap(id, mapData);

			res.status(201).json({
				error: null,
				data: updateMapProfile,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},

	async deleteMap(req, res) {
		try {
			const id = req.params.id;
			const deleteMap = await mapService.deleteMap(id);

			res.status(204).json({
				error: null,
				data: deleteMap,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},

	async getOneMap(req, res) {
		try {
			const id = req.params.id;
			const mapProfile = await mapService.getOneMap(id);

			res.json({
				error: null,
				data: mapProfile,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},

	async getAllMaps(req, res) {
		try {
			const allMaps = await mapService.getAllMaps();

			res.json({
				error: null,
				data: allMaps,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},

	async getMapsByTag(req, res) {
		try {
			const tagName = req.params.tag;
			const maps = await mapService.getMapsByTag(tagName);

			res.json({
				error: null,
				data: maps,
			});
		} catch (error) {
			res.status(error.status || 500).json({
				error: error.message || "내부 서버 오류",
				data: null,
			});
		}
	},
};

module.exports = mapController;
