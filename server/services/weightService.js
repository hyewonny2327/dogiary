const Dog = require("../models/dogModel.js");

const weightService = {
	// 몸무게 추가
	async createWeight(dogId, weightData) {
		console.log(dogId);
		console.log(weightData);
		try {
			const dog = await Dog.findById(dogId);
			dog.weights.push(weightData);
			// console.log(dog);
			const updatedDog = await dog.save();
			return updatedDog.weights[updatedDog.weights.length - 1]; // return the newly added memo
		} catch (error) {
			throw new Error("몸무게를 추가하는 중에 오류가 발생했습니다.");
		}
	},
	// 특정 몸무게 가져오기
	async getWeightById(dogId, weightId) {
		const dog = await Dog.findById(dogId);
		const weight = dog.weights.find((w) => w._id.toString() === weightId);
		// console.log(weight);
		try {
			if (!weight) {
				throw new Error("해당 ID의 몸무게를 찾을 수 없습니다.");
			}
			return weight;
		} catch (error) {
			throw new Error("몸무게 정보를 가져오는 중에 오류가 발생했습니다.");
		}
	},
	// 몸무게 정보 업데이트
	async updateWeight(dogId, weightId, updatedWeightData) {
		try {
			const dog = await Dog.findById(dogId);
			const weight = dog.weights.id(weightId);
			if (!weight) {
				throw new Error("해당 ID의 몸무게를 찾을 수 없습니다.");
			}

			weight.set(updatedWeightData);
			const updatedWeight = await dog.save();
			return updatedWeight.weights.id(weightId);
		} catch (error) {
			throw new Error("몸무게를 업데이트하는 중에 오류가 발생했습니다.");
		}
	},
	async deleteWeight(dogId, weightId) {
		try {
			const dog = await Dog.findById(dogId);
			const weightIndex = dog.weights.findIndex(
				(w) => w._id.toString() === weightId
			);
			if (weightIndex === -1) {
				throw new Error("해당 ID의 몸무게를 찾을 수 없습니다.");
			}
			dog.weights.splice(weightIndex, 1);
			const updatedDog = await dog.save();

			return updatedDog;
		} catch (error) {
			throw new Error("몸무게를 삭제하는 중에 오류가 발생했습니다.");
		}
	},
};

module.exports = weightService;
