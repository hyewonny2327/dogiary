const weightService = require("../services/weightService.js");
const errorHandler = require("../middlewares/errorHandler.js");
const commonErrors = require("../middlewares/commonError.js");
const weightController = {
	async postWeight(req, res, next) {
		try {
			const dogId = req.params.id;
			const weightData = req.body;
			if (!dogId || !weightData) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await weightService.createWeight(dogId, weightData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	// 몸무게데이터 가져오기
	async getWeightById(req, res, next) {
		try {
			const dogId = req.params.id;
			if (!dogId) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			const weight = await weightService.getWeightById(
				dogId,
				req.currentUserId
			);
			res.json(weight);
		} catch (error) {
			next(error);
		}
	},
	// 몸무게 정보 업데이트
	async putWeight(req, res, next) {
		try {
			const dogId = req.params.id;
			const weightId = req.params.weightId;
			const updatedWeightData = req.body;
			if (!dogId || !weightId || !updatedWeightData) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await weightService.updateWeight(
				dogId,
				weightId,
				updatedWeightData,
				req.currentUserId
			);
			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	// 몸무게 삭제
	async deleteWeight(req, res, next) {
		try {
			const dogId = req.params.id;
			const weightId = req.params.weightId;
			if (!dogId || !weightId) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await weightService.deleteWeight(dogId, weightId, req.currentUserId);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = weightController;
