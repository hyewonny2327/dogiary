const Dog = require("../models/dogModel.js");
const { ObjectId } = require("mongoose");

const dogService = {
	async createDog(dogData) {
		try {
			const dogProfile = await Dog.create(dogData);
			return dogProfile;
		} catch (error) {
			console.error("Error creating dog:", error);
			throw error;
		}
	},
	//강아지 수정
	async updateDog(id, dogData) {
		const { imageUrl, name, type, gender, date, birthday } = dogData;
		const dogProfile = await Dog.findById(id);
		if (!dogProfile) {
			const error = new Error("해당 강아지가 존재하지 않습니다.");
			throw error;
		}
		const updateDogProfile = await Dog.updateOne({
			imageUrl: imageUrl,
			name: name,
			type: type,
			gender: gender,
			date: date,
			birthday: birthday,
		});
		return updateDogProfile;
	},
	//강아지 삭제
	async deleteDog(id) {
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
