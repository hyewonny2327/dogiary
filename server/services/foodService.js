const Dog = require("../models/dogModel.js");

const foodService = {
	// 추가
	async createFood(dogId, foodData) {
		try {
			const dog = await Dog.findById(dogId);
			dog.foods.push(foodData);
			const updatedDog = await dog.save();
			return updatedDog.foods[updatedDog.foods.length - 1]; // return the newly added memo
		} catch (error) {
			throw new Error("음식을 추가하는 중에 오류가 발생했습니다.");
		}
	},
	//가져오기
	async getFoodById(dogId) {
		const dog = await Dog.findById(dogId);
		const food = dog.foods;
		try {
			if (!food) {
				throw new Error("음식을 찾을 수 없습니다.");
			}
			return food;
		} catch (error) {
			throw new Error("음식을 가져오는 중에 오류가 발생했습니다.");
		}
	},
	// 업데이트
	async updateFood(dogId, foodId, updatedFoodData) {
		try {
			const dog = await Dog.findById(dogId);
			const food = dog.foods.id(foodId);
			if (!food) {
				throw new Error("음식을 찾을 수 없습니다.");
			}

			food.set(updatedFoodData);
			const updatedFood = await dog.save();
			return updatedFood.foods.id(foodId);
		} catch (error) {
			throw new Error("음식을 업데이트하는 중에 오류가 발생했습니다.");
		}
	},
	//삭제
	async deleteFood(dogId, foodId) {
		try {
			const dog = await Dog.findById(dogId);
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
