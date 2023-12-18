const dogService = require("../services/dogService.js");

const dogController = {
	async postDog(req, res) {
		const dogData = req.body;
		const dogObject = await dogService.createDog(dogData);

		res.status(201).json({
			error: null,
			data: dogObject,
		});
	},
	async putDog(req, res) {
		const dogData = req.body;
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const updateDogProfile = await dogService.updatedDogProfile(id, dogData);

		res.status(200).json({
			error: null,
			data: updateDogProfile,
		});
	},
	async deleteDog(req, res) {
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const deleteDog = await dogService.deletedDog(id);

		res.status(204).json({
			error: null,
			data: deleteDog,
		});
	},
	async getOneDog(req, res) {
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const dogProfile = await dogService.getOneDog(id);

		res.json({
			error: null,
			data: dogProfile,
		});
	},
};

module.exports = dogController;
