const dogService = require('../services/dogService.js');
const errorHandler = require('../middlewares/errorHandler.js');
const commonErrors = require('../middlewares/commonErrors.js');
const path = require('path');

const dogController = {
  async postDog(req, res, next) {
    try {
      const dogData = req.body;

      dogData.imageUrl = await getImageUrl(req);
      if (!dogData) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await dogService.createDog(dogData, req.currentUserId);
      res.status(201).json({ message: 'Data created successfully' });
    } catch (error) {
      next(error);
    }
  },

  async putDog(req, res, next) {
    try {
      const dogData = req.body;
      dogData.imageUrl = await getImageUrl(req);
      const id = req.params.id;
      if (!id) {
        throw new errorHandler(
          commonErrors.argumentError,
          'id를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await dogService.updatedDogProfile(id, dogData, req.currentUserId);

      res.status(200).json({ message: 'Data updated successfully' });
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
          'id를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  async getDog(req, res, next) {
    try {
      if (req.query.id) {
        const id = req.query.id;
        const dogProfile = await dogService.getOneDog(id, req.currentUserId);

        res.json({
          error: null,
          data: dogProfile,
        });
      } else {
        console.log(req.currentUserId);
        const userDogs = await dogService.getUserDogs(req.currentUserId);
        res.json({
          error: null,
          data: userDogs,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
// 이미지 업로드 공통 함수
const getImageUrl = async (req) => {
  try {
    if (req.file && req.file.filename !== undefined) {
      return path.join(__dirname, '../public/images', file.filename);
    } else {
      throw new errorHandler(
        commonErrors.argumentError,
        '사진데이터를 받아오지 못했습니다.',
        { statusCode: 400 },
      );
    }
  } catch (error) {
    throw new errorHandler(commonErrors.internalError, 'internalError', {
      statusCode: 500,
      cause: error,
    });
  }
};
module.exports = dogController;
