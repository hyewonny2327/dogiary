const weightService = require("../services/weightService.js");

const weightController = {
	async postWeight(req, res) {
		const dogId = req.params.id;
		const weightData = req.body;
		try {
			await weightService.createWeight(dogId, weightData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	// 몸무게데이터 가져오기
	async getWeightById(req, res) {
		const dogId = req.params.id;
		try {
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
	async putWeight(req, res) {
		const dogId = req.params.id;
		const weightId = req.params.weightId;
		const updatedWeightData = req.body;
		try {
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
	async deleteWeight(req, res) {
		const dogId = req.params.id;
		const weightId = req.params.weightId;

		try {
			await weightService.deleteWeight(dogId, weightId, req.currentUserId);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = weightController;
