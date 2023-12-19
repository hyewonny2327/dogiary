const Dog = require("../models/dogModel.js");

const weightService = {
	// 몸무게 추가
	async createWeight(dogId, weightData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			weightData.userId = currentUserId;
			dog.weights.push(weightData);
			const updatedDog = await dog.save();
			return updatedDog.weights[updatedDog.weights.length - 1];
		} catch (error) {
			throw new Error("몸무게를 추가하는 중에 오류가 발생했습니다.");
		}
	},
	// 몸무게 가져오기
	async getWeightById(dogId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId).lean();
			if (dog.userId !== currentUserId) {
				const error = new Error("해당사용자에게 권한이 없습니다.실패했습니다.");
				throw error;
			}
			const weight = dog.weights;
			return weight;
		} catch (error) {
			throw new Error("몸무게 정보를 가져오는 중에 오류가 발생했습니다.");
		}
	},
	// 몸무게 정보 업데이트
	async updateWeight(dogId, weightId, updatedWeightData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				const error = new Error("해당사용자에게 권한이 없습니다.실패했습니다.");
				throw error;
			}
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
	async deleteWeight(dogId, weightId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				const error = new Error("해당사용자에게 권한이 없습니다.실패했습니다.");
				throw error;
			}
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
