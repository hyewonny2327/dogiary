const errorHandler = require('../middlewares/errorHandler.js');

const commonErrors = require('../middlewares/commonErrors.js');
const medicalService = require('../services/medicalService.js');
const medicalController = {
<<<<<<< HEAD
  //post
  async postMedical(req, res, next) {
    try {
      const dogId = req.params.id;
      const medicalData = req.body;
      if (!dogId || !medicalData) {
        throw new errorHandler(
          commonErrors.argumentError,
          "데이터를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      await medicalService.createMedical(dogId, medicalData, req.currentUserId);
      res.status(201).json({ message: "Data created successfully" });
    } catch (error) {
      next(error);
    }
  },
  // get
  async getMedicalById(req, res, next) {
    const cursor = req.query.cursor;
    try {
      const dogId = req.params.id;
      if (!dogId) {
        throw new errorHandler(
          commonErrors.argumentError,
          "데이터를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      if (req.query.limit) {
        const medical = await medicalService.getMedical3ById(
          dogId,
          req.currentUserId,
          limit
        );
        res.json({
          error: null,
          data: medical,
        });
      } else {
        const medical = await medicalService.getMedicalById(
          dogId,
          req.currentUserId,
          cursor
        );
        res.json({
          error: null,
          data: medical,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  //put
  async putMedical(req, res, next) {
    try {
      const dogId = req.params.id;
      const medicalId = req.params.medicalId;
      const updatedMedicalData = req.body;
      if (!dogId || !medicalId || !updatedMedicalData) {
        throw new errorHandler(
          commonErrors.argumentError,
          "데이터를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
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
=======
	//post
	async postMedical(req, res, next) {
		try {
			const dogId = req.params.id;
			const medicalData = req.body;
			if (!dogId || !medicalData) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			await medicalService.createMedical(dogId, medicalData, req.currentUserId);
			res.status(201).json({ message: "Data created successfully" });
		} catch (error) {
			next(error);
		}
	},
	// get
	async getMedicalById(req, res, next) {
		const cursor = req.query.cursor;
		try {
			const dogId = req.params.id;
			if (!dogId) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
			const medical = await medicalService.getMedicalById(
				dogId,
				req.currentUserId,
				cursor
			);
			res.json({
				error: null,
				data: medical,
			});
		} catch (error) {
			next(error);
		}
	},
	//put
	async putMedical(req, res, next) {
		try {
			const dogId = req.params.id;
			const medicalId = req.params.medicalId;
			const updatedMedicalData = req.body;
			if (!dogId || !medicalId || !updatedMedicalData) {
				throw new errorHandler(
					commonErrors.argumentError,
					"데이터를 받아오지 못했습니다.",
					{ statusCode: 400 }
				);
			}
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
>>>>>>> 91ec49b84a2fa1d7a7ebcab3b85776ec4f909d08

  //delete
  async deleteMedical(req, res, next) {
    try {
      const dogId = req.params.id;
      const medicalId = req.params.medicalId;
      if (!dogId || !medicalId) {
        throw new errorHandler(
          commonErrors.argumentError,
<<<<<<< HEAD
          "데이터를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      await medicalService.deleteMedical(dogId, medicalId, req.currentUserId);
      res.status(200).json({ message: "Data deleted successfully" });
=======
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await medicalService.deleteMedical(dogId, medicalId, req.currentUserId);
      res.status(200).json({ message: 'Data deleted successfully' });
>>>>>>> 91ec49b84a2fa1d7a7ebcab3b85776ec4f909d08
    } catch (error) {
      next(error);
    }
  },
};
module.exports = medicalController;
