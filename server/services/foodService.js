const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonError.js");
const Dog = require("../models/dogModel.js");
const foodService = {
	// 추가
	async createFood(dogId, foodData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		dog.foods.push(foodData);
		const updatedDog = await dog.save();
		return updatedDog.foods[updatedDog.foods.length - 1]; // return the newly added food
	},

	// 가져오기
	async getFoodById(dogId, currentUserId) {
		const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const food = dog.foods;
		if (!food) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당자료를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}
		return food;
	},

	// 업데이트
	async updateFood(dogId, foodId, updatedFoodData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const food = dog.foods.id(foodId);

		if (!food) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		food.set(updatedFoodData);
		const updatedDog = await dog.save();
		return updatedDog.foods.id(foodId);
	},

	// 삭제
	async deleteFood(dogId, foodId, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const foodIndex = dog.foods.findIndex((w) => w._id.toString() === foodId);

		if (foodIndex === -1) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		dog.foods.splice(foodIndex, 1);
		const updatedDog = await dog.save();

		return updatedDog;
	},
};

module.exports = foodService;
