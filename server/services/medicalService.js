const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonError.js");
const medicalService = {
	// 진료기록 추가
	async createMedical(dogId, medicalData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		dog.medicals.push(medicalData);
		const updatedDog = await dog.save();
		return updatedDog.medicals[updatedDog.medicals.length - 1]; // return the newly added medical record
	},
	// 진료기록 가져오기
	async getMedicalById(dogId, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const medical = dog.medicals.sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		if (!medical) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		return medical;
	},

	// 진료기록 정보 업데이트
	async updateMedical(dogId, medicalId, updatedWeightData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const medical = dog.medicals.id(medicalId);

		if (!medical) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		medical.set(updatedWeightData);
		const updatedDog = await dog.save();
		return updatedDog.medicals.id(medicalId);
	},

	// 진료기록 삭제
	async deleteMedical(dogId, medicalId, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const medicalIndex = dog.medicals.findIndex(
			(w) => w._id.toString() === medicalId
		);

		if (medicalIndex === -1) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		dog.medicals.splice(medicalIndex, 1);
		const updatedDog = await dog.save();

		return updatedDog;
	},
};

module.exports = medicalService;
