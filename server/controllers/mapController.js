const mapService = require("../services/mapService.js");
const jwt = require("jsonwebtoken");

const mapController = {
	async postMap(req, res) {
		try {
			const mapData = req.body;
			const mapProfile = await mapService.createMap(mapData, req.currentUserId);

			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	async putMap(req, res) {
		try {
			const mapData = req.body;
			const id = req.params.id;
			const updateMapProfile = await mapService.updatedMapProfile(
				id,
				mapData,
				req.currentUserId
			);

			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			if (error.status === 404) {
				res.status(404).json({
					error: "해당 맵데이터가 존재하지 않습니다.",
					data: null,
				});
			} else {
				next(error);
			}
		}
	},

	async deleteMap(req, res) {
		try {
			const id = req.params.id;
			const deleteMap = await mapService.deleteMap(id, req.currentUserId);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			if (error.status === 404) {
				res.status(404).json({
					error: "해당 맵 데이터가 존재하지 않습니다.",
					data: null,
				});
			} else {
				next(error);
			}
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
			next(error);
		}
	},

	async getMaps(req, res) {
		try {
			// 태그가 존재하면 태그별 조회, 없으면 전체 조회
			if (req.query.tag) {
				const tagName = req.query.tag;
				const maps = await mapService.getMapsByTag(tagName);
				res.json({
					error: null,
					data: maps,
				});
			} else if (req.query.myMaps) {
				// 새로 추가한 부분: myMaps가 요청에 있을 때
				const currentUserId = req.currentUserId;
				const myMaps = await mapService.getMyMaps(currentUserId);
				res.json({
					error: null,
					data: myMaps,
				});
			} else {
				const allMaps = await mapService.getAllMaps();
				res.json({
					error: null,
					data: allMaps,
				});
			}
		} catch (error) {
			next(error);
		}
	},
};

module.exports = mapController;
