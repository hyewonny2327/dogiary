const dogService = require("../services/dogService.js");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middlewares/errorHandler.js");
const commonErrors = require("../middlewares/commonErrors.js");
const dogController = {
  async postDog(req, res, next) {
    try {
      const dogData = req.body;
      await dogService.createDog(dogData, req.currentUserId);
      if (!dogData) {
        throw new errorHandler(
          commonErrors.argumentError,
          "데이터를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      res.status(201).json({ message: "Data created successfully" });
    } catch (error) {
      next(error);
    }
  },

  async putDog(req, res, next) {
    try {
      const dogData = req.body;
      const id = req.params.id;
      if (!id) {
        throw new errorHandler(
          commonErrors.argumentError,
          "id를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      await dogService.updatedDogProfile(id, dogData, req.currentUserId);

      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  async deleteDog(req, res, next) {
    try {
      const id = req.params.id;
      await dogService.deletedDog(id, req.currentUserId);
      if (!id) {
        throw new errorHandler(
          commonErrors.argumentError,
          "id를 받아오지 못했습니다.",
          { statusCode: 400 }
        );
      }
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

	async getOneDog(req, res, next) {
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
