const foodService = require("../services/foodService.js");

const foodController = {
	// post
	async postFood(req, res) {
		const dogId = req.params.id;
		const foodData = req.body;
		try {
			const newFood = await foodService.createFood(
				dogId,
				foodData,
				req.currentUserId
			);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},

	// get
	async getFoodById(req, res) {
		const dogId = req.params.id;
		try {
			const food = await foodService.getFoodById(dogId, req.currentUserId);
			res.json(food);
		} catch (error) {
			next(error);
		}
	},

	// put
	async putFood(req, res) {
		const dogId = req.params.id;
		const foodId = req.params.foodId;
		const updatedFoodData = req.body;
		try {
			const updatedFood = await foodService.updateFood(
				dogId,
				foodId,
				updatedFoodData,
				req.currentUserId
			);
			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	// delete
	async deleteFood(req, res) {
		const dogId = req.params.id;
		const foodId = req.params.foodId;

		try {
			const updatedDog = await foodService.deleteFood(
				dogId,
				foodId,
				req.currentUserId
			);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = foodController;
