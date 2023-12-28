const { body, check, validationResult } = require('express-validator');

const validatePostDogInfo = [
    body('name').notEmpty().withMessage('이름을 입력하세요.'),
    body('type').notEmpty().withMessage('품종을 입력하세요.'),
    body('sex').notEmpty().withMessage('성별을 입력하세요.'),
    body('date').notEmpty().withMessage('날짜를 입력하세요.'),
    body('birthday').notEmpty().withMessage('생일을 입력하세요.'),
    check('imageUrl').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('이미지를 업로드하세요.');
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, error: errors.array()[0].msg });
      }
      next();
    },
];

const validateUpdateDogInfo = [
    body('name').optional().notEmpty().withMessage('이름을 입력하세요.'),
    body('type').optional().notEmpty().withMessage('품종을 입력하세요.'),
    body('sex').optional().notEmpty().withMessage('성별을 입력하세요.'),
    body('date').optional().notEmpty().withMessage('날짜를 입력하세요.'),
    body('birthday').optional().notEmpty().withMessage('생일을 입력하세요.'),
    check('imageUrl').optional().custom((value, { req }) => {
      if (!req.file) {
        throw new Error('이미지를 업로드하세요.');
      }
      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, error: errors.array()[0].msg });
      }
      next();
    },
];

module.exports = {
    validatePostDogInfo,
    validateUpdateDogInfo,
};