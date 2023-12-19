const Dog = require("../models/dogModel.js");

const memoService = {
	// 추가
	async createMemo(dogId, memoData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			dog.memos.push(memoData);
			const updatedDog = await dog.save();
			return updatedDog.memos[updatedDog.memos.length - 1]; // return the newly added memo
		} catch (error) {
			throw new Error("메모를 추가하는 중에 오류가 발생했습니다.");
		}
	},

	// 가져오기
	async getMemoById(dogId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const memo = dog.memos;

			if (!memo) {
				throw new Error("메모를 찾을 수 없습니다.");
			}

			return memo;
		} catch (error) {
			throw new Error("메모를 가져오는 중에 오류가 발생했습니다.");
		}
	},

	// 업데이트
	async updateMemo(dogId, memoId, updatedMemoData, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const memo = dog.memos.id(memoId);

			if (!memo) {
				throw new Error("해당 ID의 메모를 찾을 수 없습니다.");
			}

			memo.set(updatedMemoData);
			const updatedMemo = await dog.save();
			return updatedMemo.memos.id(memoId);
		} catch (error) {
			throw new Error("메모를 업데이트하는 중에 오류가 발생했습니다.");
		}
	},

	// 삭제
	async deleteMemo(dogId, memoId, currentUserId) {
		try {
			const dog = await Dog.findById(dogId);
			if (dog.userId !== currentUserId) {
				throw new Error("해당 사용자에게 권한이 없습니다. 실패했습니다.");
			}
			const memoIndex = dog.memos.findIndex((w) => w._id.toString() === memoId);

			if (memoIndex === -1) {
				throw new Error("해당 ID의 메모를 찾을 수 없습니다.");
			}

			dog.memos.splice(memoIndex, 1);
			const updatedDog = await dog.save();

			return updatedDog;
		} catch (error) {
			throw new Error("메모를 삭제하는 중에 오류가 발생했습니다.");
		}
	},
};

module.exports = memoService;
