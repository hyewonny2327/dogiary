const medicalService = require("../services/medicalService.js");

const medicalController = {
	//post
	async postMedical(req, res) {
		const dogId = req.params.id;
		const medicalData = req.body;
		try {
			await medicalService.createMedical(dogId, medicalData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	// get
	async getMedicalById(req, res) {
		const dogId = req.params.id;
		try {
			const medical = await medicalService.getMedicalById(
				dogId,
				req.currentUserId
			);
			res.json(medical);
		} catch (error) {
			next(error);
		}
	},
	//put
	async putMedical(req, res) {
		const dogId = req.params.id;
		const medicalId = req.params.medicalId;
		const updatedMedicalData = req.body;
		try {
			await medicalService.updateMedical(
				dogId,
				medicalId,
				updatedMedicalData,
				req.currentUserId
			);
			res.status(200).json({ message: "Data updated successfully" });
		} catch (error) {
			next(error);
		}
	},

	//delete
	async deleteMedical(req, res) {
		const dogId = req.params.id;
		const medicalId = req.params.medicalId;

		try {
			await medicalService.deleteMedical(dogId, medicalId, req.currentUserId);
			res.status(204).json({ message: "Data deleted successfully" });
		} catch (error) {
			next(error);
		}
	},
};
module.exports = medicalController;
