const foodService = require('../services/foodService.js');
const errorHandler = require('../middlewares/errorHandler.js');

const commonErrors = require('../middlewares/commonErrors.js');
const foodController = {
  // post
  async postFood(req, res, next) {
    try {
      const dogId = req.params.id;
      const foodData = req.body;
      if (!dogId || !foodData) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await foodService.createFood(dogId, foodData, req.currentUserId);
      res.status(201).json({ message: 'Data created successfully' });
    } catch (error) {
      next(error);
    }
  },

  // get
  async getFoodById(req, res, next) {
    const cursor = req.query.cursor;
    try {
      const dogId = req.params.id;
      if (!dogId) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      if (req.query.limit) {
        const food = await foodService.getFood3ById(
          dogId,
          req.currentUserId,
          req.query.limit,
        );
        res.status(200).json({ error: null, data: food });
      } else {
        const food = await foodService.getFoodById(
          dogId,
          req.currentUserId,
          cursor,
        );
        res.status(200).json({ error: null, data: food });
      }
    } catch (error) {
      next(error);
    }
  },

  // put
  async putFood(req, res, next) {
    const dogId = req.params.id;
    const foodId = req.params.foodId;
    const updatedFoodData = req.body;
    if (!dogId || !foodId || !updatedFoodData) {
      throw new errorHandler(
        commonErrors.argumentError,
        '데이터를 받아오지 못했습니다.',
        { statusCode: 400 },
      );
    }
    try {
      await foodService.updateFood(
        dogId,
        foodId,
        updatedFoodData,
        req.currentUserId,
      );
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // delete
  async deleteFood(req, res, next) {
    const dogId = req.params.id;
    const foodId = req.params.foodId;
    if (!dogId || !foodId) {
      throw new errorHandler(
        commonErrors.argumentError,
        '데이터를 받아오지 못했습니다.',
        { statusCode: 400 },
      );
    }
    try {
      await foodService.deleteFood(dogId, foodId, req.currentUserId);
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = foodController;
