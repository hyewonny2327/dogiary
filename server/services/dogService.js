const Dog = require("../models/dogModel.js");
const { ObjectId } = require("mongoose");

const dogService = {
	async createDog(dogData) {
		try {
			const dogProfile = await Dog.create(dogData);
			const dogObject = dogProfile.toObject();
			return dogObject;
		} catch (error) {
			console.error("Error creating dog:", error);
			throw error;
		}
	},
	//강아지 수정
	async updatedDogProfile(id, dogData) {
		const { imageUrl, name, type, gender, date, birthday } = dogData;
		const dogProfile = await Dog.findById(id).lean();

		if (!dogProfile) {
			const error = new Error("해당 강아지가 존재하지 않습니다.");
			throw error;
		}

		const result = await Dog.updateOne(
			{ _id: id }, // 검색 조건
			{
				imageUrl: imageUrl,
				name: name,
				type: type,
				sex: gender,
				date: date,
				birthday: birthday,
			}
		);

		if (result.modifiedCount !== 1) {
			// 업데이트된 문서의 수가 1이 아닌 경우 처리
			const error = new Error("강아지 프로필 업데이트에 실패했습니다.");
			throw error;
		}

		return result;
	},
	//강아지 삭제
	async deletedDog(id) {
		const deleteDog = await Dog.findByIdAndDelete(id);
		if (!deleteDog) {
			const error = new Error("해당 강아지가 존재하지 않습니다.");
			throw error;
		}
		return deleteDog;
	},
	//강아지 조회
	async getOneDog(id) {
		const dogProfile = await Dog.findById(id).lean();
		if (!dogProfile || dogProfile.length === 0) {
			const error = new Error("해당 강아지가 존재하지 않습니다.");
			throw error;
		}
		return dogProfile;
	},
};

module.exports = dogService;
