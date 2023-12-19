const Dog = require("../models/dogModel.js");

const medicalService = {
	// 진료기록 추가
	async createMedical(dogId, medicalData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			dog.medicals.push(medicalData);
			const updatedDog = await dog.save();
			return updatedDog.medicals[updatedDog.medicals.length - 1]; // return the newly added medical record
		} catch (error) {
			throw new Error("진료기록을 추가하는 중에 오류가 발생했습니다.");
		}
	},

	// 진료기록 가져오기
	async getMedicalById(dogId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const medical = dog.medicals;

			if (!medical) {
				throw new Error("진료기록을 찾을 수 없습니다.");
			}

			return medical;
		} catch (error) {
			throw new Error("진료기록을 가져오는 중에 오류가 발생했습니다.");
		}
	},

	// 진료기록 정보 업데이트
	async updateMedical(dogId, medicalId, updatedWeightData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const medical = dog.medicals.id(medicalId);

			if (!medical) {
				throw new Error("해당 ID의 진료기록을 찾을 수 없습니다.");
			}

			medical.set(updatedWeightData);
			const updatedDog = await dog.save();
			return updatedDog.medicals.id(medicalId);
		} catch (error) {
			throw new Error("진료기록을 업데이트하는 중에 오류가 발생했습니다.");
		}
	},

	// 진료기록 삭제
	async deleteMedical(dogId, medicalId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const medicalIndex = dog.medicals.findIndex(
				(w) => w._id.toString() === medicalId
			);

			if (medicalIndex === -1) {
				throw new Error("해당 ID의 진료기록을 찾을 수 없습니다.");
			}

			dog.medicals.splice(medicalIndex, 1);
			const updatedDog = await dog.save();

			return updatedDog;
		} catch (error) {
			throw new Error("진료기록을 삭제하는 중에 오류가 발생했습니다.");
		}
	},
};

module.exports = medicalService;
