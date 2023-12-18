const mapService = require("../services/mapService.js");

const mapController = {
	async postMap(req, res) {
		try {
			const mapData = req.body;
			const mapProfile = await mapService.createMap(mapData);

			res.status(201).json({
				error: null,
				data: mapProfile,
			});
		} catch (error) {
			handleError(res, error);
		}
	},

	async putMap(req, res) {
		try {
			const mapData = req.body;
			const id = req.params.id;
			const updateMapProfile = await mapService.updatedMapProfile(id, mapData);

			res.status(200).json({
				error: null,
				data: updateMapProfile,
			});
		} catch (error) {
			if (error.status === 404) {
				res.status(404).json({
					error: "해당 맵데이터가 존재하지 않습니다.",
					data: null,
				});
			} else {
				handleError(res, error);
			}
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
			if (error.status === 404) {
				res.status(404).json({
					error: "해당 맵 데이터가 존재하지 않습니다.",
					data: null,
				});
			} else {
				handleError(res, error);
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
			if (error.status === 404) {
				res.status(404).json({
					error: "맵 데이터가 존재하지 않습니다.",
					data: null,
				});
			} else {
				handleError(res, error);
			}
		}
	},

	// GET: /maps - 마커 전체 조회 또는 태그별 조회
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
			} else {
				const allMaps = await mapService.getAllMaps();
				res.json({
					error: null,
					data: allMaps,
				});
			}
		} catch (error) {
			handleError(res, error);
		}
	},

	// 	async getMapsByTag(req, res) {
	// 		console.log(req);
	// 		try {
	// 			const tagName = req.query.tag;
	// 			const maps = await mapService.getMapsByTag(tagName);
	// 			res.json({
	// 				error: null,
	// 				data: maps,
	// 			});
	// 		} catch (error) {
	// 			if (error.status === 404) {
	// 				res.status(404).json({
	// 					error: "해당 태그가 존재하지 않습니다.",
	// 					data: null,
	// 				});
	// 			} else {
	// 				handleError(res, error);
	// 			}
	// 		}
	// 	},
};

// 추가된 handleError 함수
function handleError(res, error) {
	const status = error.status || 500;
	res.status(status).json({
		error: error.message || "내부 서버 오류",
		data: null,
	});
}

module.exports = mapController;
