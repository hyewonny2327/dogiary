const { body, check, validationResult } = require('express-validator');

const validatePostMapInfo = [
    body('content').notEmpty().withMessage('이름을 입력하세요.'),
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

const validateUpdateMapInfo = [
    body('content').optional().notEmpty().withMessage('이름을 입력하세요.'),
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
    validatePostMapInfo,
    validateUpdateMapInfo,
};