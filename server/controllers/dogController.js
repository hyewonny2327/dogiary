const dogService = require("../services/dogService.js");
const jwt = require("jsonwebtoken");

const dogController = {
	async postDog(req, res) {
		try {
			const dogData = req.body;
			const dogObject = await dogService.createDog(dogData, req.currentUserId);

			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},

	async putDog(req, res) {
		try {
			const dogData = req.body;
			const id = req.params.id;
			const updateDogProfile = await dogService.updatedDogProfile(
				id,
				dogData,
				req.currentUserId
			);

			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	async deleteDog(req, res) {
		try {
			const id = req.params.id;
			const deleteDog = await dogService.deletedDog(id, req.currentUserId);

			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},

	async getOneDog(req, res) {
		try {
			const id = req.params.id;
			const dogProfile = await dogService.getOneDog(id, req.currentUserId);

			res.json({
				error: null,
				data: dogProfile,
			});
		} catch (error) {
			next(error);
		}
	},
};

module.exports = dogController;
