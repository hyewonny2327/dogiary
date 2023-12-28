const { body, check, validationResult } = require('express-validator');

// 다이어리 생성 데이터 검증
const validatePostDiary = [
  body('title').notEmpty().withMessage('제목을 입력하세요.'),
  body('content').notEmpty().withMessage('내용을 입력하세요.'),
  body('date').notEmpty().withMessage('날짜를 입력하세요.'),
  check('imageUrls').custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
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

const validateUpdateDiary = [
  body('title').optional().notEmpty().withMessage('제목을 입력하세요.'),
  body('content').optional().notEmpty().withMessage('내용을 입력하세요.'),
  body('date').optional().notEmpty().withMessage('날짜를 입력하세요.'),
  check('imageUrls').optional().custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
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
    validatePostDiary,
    validateUpdateDiary,
};