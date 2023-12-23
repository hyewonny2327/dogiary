const mapService = require("../services/mapService.js");
const errorHandler = require("../middlewares/errorHandler.js");
const rankService = require("../services/rankService.js");
const commonErrors = require("../middlewares/commonErrors.js");
const mapController = {
	async postMap(req, res, next) {
		try {
			const mapData = req.body;
			if (!mapData) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await mapService.createMap(mapData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	async putMap(req, res, next) {
		try {
			const mapData = req.body;
			const id = req.params.id;
			if (!mapData || !id) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await mapService.updatedMapProfile(id, mapData, req.currentUserId);
			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	async deleteMap(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await mapService.deleteMap(id, req.currentUserId);
			res.status(200).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},

	async getOneMap(req, res, next) {
		try {
			const id = req.params.id;
			if (!id) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			const mapProfile = await mapService.getOneMap(id);
			res.json({
				error: null,
				data: mapProfile,
			});
		} catch (error) {
			next(error);
		}
	},
	async getMaps(req, res, next) {
		const cursor = req.query.cursor;
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
				const myMaps = await mapService.getMyMaps(currentUserId, cursor);
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
	async getRank(req, res, next) {
		try {
			const currentUserId = req.currentUserId;
			const rank = await rankService.getRank(currentUserId);
			res.json({
				error: null,
				data: rank,
			});
		} catch (error) {
			next(error);
		}
	},
};

module.exports = mapController;
