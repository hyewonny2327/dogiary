const Dog = require("../models/dogModel.js");

const dogService = {
	async createDog(dogData, currentUserId) {
		try {
			dogData.userId = currentUserId;
			const dog = await Dog.create(dogData);
			const dogObject = dog.toObject();
			return dogObject;
		} catch (error) {
			throw error;
		}
	},

	// 강아지 수정
	async updatedDogProfile(id, dogData, currentUserId) {
		try {
			const { imageUrl, name, type, gender, date, birthday } = dogData;
			const dog = await Dog.findById(id).lean();

			if (dog.userId !== currentUserId) {
				throw {
					status: 403,
					message: "해당 사용자에게 권한이 없습니다. 실패했습니다.",
				};
			}
			if (!dog) {
				throw new Error("해당 강아지가 존재하지 않습니다.");
			}
			const result = await Dog.updateOne(
				{ _id: id }, // 검색 조건
				{
					userId: currentUserId,
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
				throw new Error("강아지 프로필 업데이트에 실패했습니다.");
			}
			return result;
		} catch (error) {
			throw error;
		}
	},

	// 강아지 삭제
	async deletedDog(id, currentUserId) {
		try {
			const dog = await Dog.findById(id);

			if (dog.userId !== currentUserId) {
				throw { status: 403, message: "해당 사용자에게 삭제 권한이 없습니다." };
			}

			if (!dog) {
				throw new Error("해당 강아지가 존재하지 않습니다.");
			}

			const deleteDog = await Dog.findByIdAndDelete(id);
			return deleteDog;
		} catch (error) {
			throw error;
		}
	},

	// 강아지 조회
	async getOneDog(id, currentUserId) {
		try {
			const dog = await Dog.findById(id).lean();

			if (dog.userId !== currentUserId) {
				throw { status: 403, message: "해당 사용자에게 조회 권한이 없습니다." };
			}

			if (!dog || dog.length === 0) {
				throw new Error("해당 강아지가 존재하지 않습니다.");
			}

			return dog;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = dogService;
