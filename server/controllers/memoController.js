const memoService = require('../services/memoService.js');
const errorHandler = require('../middlewares/errorHandler.js');

const commonErrors = require('../middlewares/commonErrors.js');
const memoController = {
  //post
  async postMemo(req, res, next) {
    try {
      const dogId = req.params.id;
      const memoData = req.body;
      if (!dogId || !memoData) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await memoService.createMemo(dogId, memoData, req.currentUserId);
      res.status(201).json({ message: 'Data created successfully' });
    } catch (error) {
      next(error);
    }
  },
  // get
  async getMemoById(req, res, next) {
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
        const memo = await memoService.getMemo3ById(
          dogId,
          req.currentUserId,
          req.query.limit,
        );
        res.json({
          error: null,
          data: memo,
        });
      } else {
        const memo = await memoService.getMemoById(
          dogId,
          req.currentUserId,
          cursor,
        );
        res.json({
          error: null,
          data: memo,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  //put
  async putMemo(req, res, next) {
    try {
      const dogId = req.params.id;
      const memoId = req.params.memoId;
      const updatedMemoData = req.body;
      if (!dogId || !memoId || !updatedMemoData) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await memoService.updateMemo(
        dogId,
        memoId,
        updatedMemoData,
        req.currentUserId,
      );
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  //delete
  async deleteMemo(req, res, next) {
    try {
      const dogId = req.params.id;
      const memoId = req.params.memoId;
      if (!dogId || !memoId) {
        throw new errorHandler(
          commonErrors.argumentError,
          '데이터를 받아오지 못했습니다.',
          { statusCode: 400 },
        );
      }
      await memoService.deleteMemo(dogId, memoId, req.currentUserId);
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = memoController;
