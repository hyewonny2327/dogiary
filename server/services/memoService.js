const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonError.js");
const memoService = {
	// 추가
	async createMemo(dogId, memoData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new AppError(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		dog.memos.push(memoData);
		const updatedDog = await dog.save();
		return updatedDog.memos[updatedDog.memos.length - 1]; // return the newly added memo
	},

	// 가져오기
	async getMemoById(dogId, currentUserId) {
		const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
		if (dog.userId !== currentUserId) {
			throw new AppError(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const memo = dog.memos;

		if (!memo) {
			throw new AppError(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		return memo;
	},

	// 업데이트
	async updateMemo(dogId, memoId, updatedMemoData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new AppError(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const memo = dog.memos.id(memoId);

		if (!memo) {
			throw new AppError(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		memo.set(updatedMemoData);
		const updatedMemo = await dog.save();
		return updatedMemo.memos.id(memoId);
	},

	// 삭제
	async deleteMemo(dogId, memoId, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new AppError(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const memoIndex = dog.memos.findIndex((w) => w._id.toString() === memoId);

		if (memoIndex === -1) {
			throw new AppError(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		dog.memos.splice(memoIndex, 1);
		const updatedDog = await dog.save();

		return updatedDog;
	},
};

module.exports = memoService;
