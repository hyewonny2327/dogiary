const weightService = require("../services/weightService.js");

const weightController = {
	async createWeight(req, res) {
		const dogId = req.params.id;
		const weightData = req.body;
		// console.log(weightData);
		try {
			const newWeight = await weightService.createWeight(dogId, weightData);
			res.status(201).json(newWeight);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// 특정 몸무게 가져오기
	async getWeightById(req, res) {
		// console.log(req.params);
		const dogId = req.params.id;
		const weightId = req.params.weightId;
		// console.log(dogId, weightId);
		try {
			const weight = await weightService.getWeightById(dogId, weightId);
			res.json(weight);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// 몸무게 정보 업데이트
	async updateWeight(req, res) {
		const dogId = req.params.id;
		const weightId = req.params.weightId;
		const updatedWeightData = req.body;
		try {
			const updatedWeight = await weightService.updateWeight(
				dogId,
				weightId,
				updatedWeightData
			);
			res.json(updatedWeight);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// 몸무게 삭제
	async deleteWeight(req, res) {
		const dogId = req.params.id;
		const weightId = req.params.weightId;

		try {
			const updatedDog = await weightService.deleteWeight(dogId, weightId);
			res.json(updatedDog);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

module.exports = weightController;
