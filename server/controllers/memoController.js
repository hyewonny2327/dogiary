const memoService = require("../services/memoService.js");

const memoController = {
	//post
	async postMemo(req, res) {
		const dogId = req.params.id;
		const memoData = req.body;
		try {
			await memoService.createMemo(dogId, memoData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	// get
	async getMemoById(req, res) {
		const dogId = req.params.id;
		try {
			const memo = await memoService.getMemoById(dogId, req.currentUserId);
			res.json(memo);
		} catch (error) {
			next(error);
		}
	},
	//put
	async putMemo(req, res) {
		const dogId = req.params.id;
		const memoId = req.params.memoId;
		const updatedMemoData = req.body;
		try {
			await memoService.updateMemo(
				dogId,
				memoId,
				updatedMemoData,
				req.currentUserId
			);
			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	//delete
	async deleteMemo(req, res) {
		const dogId = req.params.id;
		const memoId = req.params.memoId;

		try {
			await memoService.deleteMemo(dogId, memoId, req.currentUserId);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = memoController;
