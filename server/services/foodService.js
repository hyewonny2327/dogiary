const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonErrors.js");
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
	//무한스크롤 구현
	async getFoodById(dogId, currentUserId, cursor, pageSize = 3) {
		//10개씩
		const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		let food = dog.foods;
		if (cursor) {
			food = food.filter((item) => new Date(item.date) < new Date(cursor));
		}
		// 내림차순 정렬
		food.sort((a, b) => new Date(b.date) - new Date(a.date));
		if (!food) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당자료를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}
		// 페이징 처리
		let startIndex = 0;
		if (cursor) {
			// 현재 페이지의 시작 인덱스를 찾아내기
			startIndex = food.findIndex(
				(item) => new Date(item.date) <= new Date(cursor)
			);
			if (startIndex === -1) {
				// 커서의 날짜보다 이전 데이터가 없을 경우 처음부터 반환
				return null;
			}
		}
		const endIndex = startIndex + pageSize;
		const slicedFood = food.slice(startIndex, endIndex);

		return slicedFood;
	},
	// 가져오기 3개
	async getFood3ById(dogId, currentUserId) {
		const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const food = dog.foods
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 3);
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
