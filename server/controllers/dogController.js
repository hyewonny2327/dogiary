const dogService = require("../services/dogService.js");

const dogController = {
	async createDog(req, res) {
		const dogData = req.body;
		console.log(dogData);
		const dogProfile = await dogService.createDog(dogData);

		res.status(201).json({
			error: null,
			data: dogProfile,
		});
	},
	async updateDog(req, res) {
		const dogData = req.body;
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const updateDogProfile = await dogService.updateDog(id, dogData);

		res.status(201).json({
			error: null,
			data: updateDogProfile,
		});
	},
	async deleteDog(req, res) {
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const deleteDog = await dogService.deleteDog(id);

		res.status(204).json({
			error: null,
			data: deleteDog,
		});
	},
	async getOneDog(req, res) {
		console.log("들어옴?");
		const id = req.params.id; // 'id' 프로퍼티를 명시적으로 사용
		const dogProfile = await dogService.getOneDog(id);

		res.json({
			error: null,
			data: dogProfile,
		});
	},
};

module.exports = dogController;
