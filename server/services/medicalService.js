const Dog = require("../models/dogModel.js");

const medicalService = {
	// 진료기록 추가
	async createMedical(dogId, medicalData) {
		try {
			const dog = await Dog.findById(dogId);
			dog.medicals.push(medicalData);
			const updatedDog = await dog.save();
			return updatedDog.mediclas[updatedDog.medicals.length - 1]; // return the newly added memo
		} catch (error) {
			throw new Error("진료기록을 추가하는 중에 오류가 발생했습니다.");
		}
	},
	// 특정 진료기록 가져오기
	async getMedicalById(dogId) {
		const dog = await Dog.findById(dogId);
		const medical = dog.medicals;
		try {
			if (!medical) {
				throw new Error("진료기록을 찾을 수 없습니다.");
			}
			return medical;
		} catch (error) {
			throw new Error("진료기록을 가져오는 중에 오류가 발생했습니다.");
		}
	},
	// 진료기록 정보 업데이트
	async updateMedical(dogId, medicalId, updatedWeightData) {
		try {
			const dog = await Dog.findById(dogId);
			const medical = dog.medicals.id(medicalId);
			if (!medical) {
				throw new Error("해당 ID의 진료기록을 찾을 수 없습니다.");
			}

			medical.set(updatedWeightData);
			const updatedWeight = await dog.save();
			return updatedWeight.medicals.id(medicalId);
		} catch (error) {
			throw new Error("진료기록을 업데이트하는 중에 오류가 발생했습니다.");
		}
	},
	async deleteMedical(dogId, medicalId) {
		try {
			const dog = await Dog.findById(dogId);
			const medicalIndex = dog.medicals.findIndex(
				(w) => w._id.toString() === medicalId
			);
			if (medicalIndex === -1) {
				throw new Error("해당 ID의 진료기록을 찾을 수 없습니다.");
			}
			dog.mediclas.splice(medicalIndex, 1);
			const updatedDog = await dog.save();

			return updatedDog;
		} catch (error) {
			throw new Error("진료기록을 삭제하는 중에 오류가 발생했습니다.");
		}
	},
};

module.exports = medicalService;
