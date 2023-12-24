const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");
const commonErrors = require("../middlewares/commonErrors.js");
const mongoose = require("mongoose");

const memoService = {
	// 추가
	async createMemo(dogId, memoData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		dog.memos.push(memoData);
		const updatedDog = await dog.save();
		return updatedDog.memos[updatedDog.memos.length - 1]; // return the newly added memo
	},

	// 무한스크롤구현
	async getMemoById(dogId, currentUserId, cursor, pageSize = 10) {
		const memos = await Dog.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(dogId),
				},
			},
			{ $unwind: "$memos" },
			{ $match: { "memos._id": { $lt: new mongoose.Types.ObjectId(cursor) } } },
			{ $sort: { "memos.date": -1 } },
			{ $project: { memos: 1 } },
			{ $limit: 10 },
		]);
		return memos;
	},
	// 업데이트
	async updateMemo(dogId, memoId, updatedMemoData, currentUserId) {
		const dog = await Dog.findById(dogId);
		if (dog.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const memo = dog.memos.id(memoId);

		if (!memo) {
			throw new errorHandler(
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
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		const memoIndex = dog.memos.findIndex((w) => w._id.toString() === memoId);

		if (memoIndex === -1) {
			throw new errorHandler(
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
