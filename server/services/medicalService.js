const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");
const mongoose = require("mongoose");
const commonErrors = require("../middlewares/commonErrors.js");

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
	// 진료기록 가져오기(무한 스크롤)
	async getMedicalById(dogId, currentUserId, cursor) {
		const medicals = await Dog.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(dogId) } },
			{ $unwind: "$medicals" },
			{
				$match: {
					"medicals._id": { $lt: new mongoose.Types.ObjectId(cursor) },
				},
			},
			{ $sort: { "medicals.date": -1 } },
			{ $project: { medicals: 1 } },
			{ $limit: 10 },
		]);
		return medicals;
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
        '해당 데이터를 찾을수없습니다.',
        { statusCode: 404 },
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
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 403 },
      );
    }
    const medicalIndex = dog.medicals.findIndex(
      (w) => w._id.toString() === medicalId,
    );

    if (medicalIndex === -1) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        '해당 데이터를 찾을수없습니다.',
        { statusCode: 404 },
      );
    }

    dog.medicals.splice(medicalIndex, 1);
    const updatedDog = await dog.save();

    return updatedDog;
  },
};

module.exports = medicalService;
