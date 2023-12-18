const Dog = require("../models/dogModel.js");

const memoService = {
	// 추가
	async createFood(dogId, memoData) {
		try {
			const dog = await Dog.findById(dogId);
			dog.memos.push(memoData);
			const updatedDog = await dog.save();
			return updatedDog.memos[updatedDog.memos.length - 1]; // return the newly added memo
		} catch (error) {
			throw new Error("메모를 추가하는 중에 오류가 발생했습니다.");
		}
	},
	//가져오기
	async getFoodById(dogId) {
		const dog = await Dog.findById(dogId);
		const memo = dog.memos;
		try {
			if (!memo) {
				throw new Error("메모를 찾을 수 없습니다.");
			}
			return memo;
		} catch (error) {
			throw new Error("메모를 가져오는 중에 오류가 발생했습니다.");
		}
	},
	// 업데이트
	async updateFood(dogId, memoId, updatedMemoData) {
		try {
			const dog = await Dog.findById(dogId);
			const memo = dog.memos.id(memoId);
			if (!memo) {
				throw new Error("메모를 찾을 수 없습니다.");
			}

			food.set(updatedMemoData);
			const updatedMemo = await dog.save();
			return updatedMemo.memos.id(memoId);
		} catch (error) {
			throw new Error("메모를 업데이트하는 중에 오류가 발생했습니다.");
		}
	},
	//삭제
	async deleteFood(dogId, memoId) {
		try {
			const dog = await Dog.findById(dogId);
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
