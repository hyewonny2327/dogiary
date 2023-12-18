const foodService = require("../services/foodService.js");

const foodController = {
	async createFood(req, res) {
		const dogId = req.params.id;
		const foodData = req.body;
		try {
			const newFood = await foodService.createFood(dogId, foodData);
			res.status(201).json(newFood);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// 특정 몸무게 가져오기
	async getFoodById(req, res) {
		// console.log(req.params);
		const dogId = req.params.id;
		const foodId = req.params.foodId;
		// console.log(dogId, weightId);
		try {
			const food = await foodService.getFoodById(dogId, foodId);
			res.json(food);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// 몸무게 정보 업데이트
	async updateFood(req, res) {
		const dogId = req.params.id;
		const foodId = req.params.foodId;
		const updatedFoodData = req.body;
		try {
			const updatedFood = await foodService.updateFood(
				dogId,
				foodId,
				updatedWeightData
			);
			res.json(updatedWeight);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// 몸무게 삭제
	async deleteFood(req, res) {
		const dogId = req.params.id;
		const foodId = req.params.foodId;

		try {
			const updatedDog = await foodService.deleteFood(dogId, foodId);
			res.json(updatedDog);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

module.exports = weightController;
