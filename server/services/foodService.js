const Dog = require("../models/dogModel.js");

const foodService = {
	// 추가
	async createFood(dogId, foodData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			dog.foods.push(foodData);
			const updatedDog = await dog.save();
			return updatedDog.foods[updatedDog.foods.length - 1]; // return the newly added food
		} catch (error) {
			throw new Error("음식을 추가하는 중에 오류가 발생했습니다.");
		}
	},

	// 가져오기
	async getFoodById(dogId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const food = dog.foods;

			if (!food) {
				throw new Error("음식을 찾을 수 없습니다.");
			}

			return food;
		} catch (error) {
			throw new Error("음식을 가져오는 중에 오류가 발생했습니다.");
		}
	},

	// 업데이트
	async updateFood(dogId, foodId, updatedFoodData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const food = dog.foods.id(foodId);

			if (!food) {
				throw new Error("음식을 찾을 수 없습니다.");
			}

			food.set(updatedFoodData);
			const updatedDog = await dog.save();
			return updatedDog.foods.id(foodId);
		} catch (error) {
			throw new Error("음식을 업데이트하는 중에 오류가 발생했습니다.");
		}
	},

	// 삭제
	async deleteFood(dogId, foodId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const foodIndex = dog.foods.findIndex((w) => w._id.toString() === foodId);

			if (foodIndex === -1) {
				throw new Error("해당 ID의 음식을 찾을 수 없습니다.");
			}

			dog.foods.splice(foodIndex, 1);
			const updatedDog = await dog.save();

			return updatedDog;
		} catch (error) {
			throw new Error("음식을 삭제하는 중에 오류가 발생했습니다.");
		}
	},
};

module.exports = foodService;
