const { body, check, validationResult } = require('express-validator');

// 회원가입 데이터 검증
const validateSignUp = [
  body('nickName')
  .notEmpty().withMessage('닉네임을 입력하세요.')
  .isString().withMessage('닉네임은 문자열 Type이어야 합니다.'),
  body('userId')
  .notEmpty().withMessage('아이디를 입력하세요.')
  .isString().withMessage('아이디는 문자열 Type이어야 합니다.'),
  body('password')
  .notEmpty().withMessage('비밀번호를 입력하세요.')
  .isString().withMessage('비밀번호는 문자열 Type이어야 합니다.'),
  body('email')
  .isEmail().withMessage('유효한 이메일 주소를 입력하세요.')
  .isString().withMessage('이메일은 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 로그인 데이터 검증
const validateSignIn = [
  body('userId')
  .notEmpty().withMessage('아이디를 입력하세요.')
  .isString().withMessage('아이디는 문자열 Type이어야 합니다.'),
  body('password')
  .notEmpty().withMessage('비밀번호를 입력하세요.')
  .isString().withMessage('비밀번호는 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 아이디 중복 확인 데이터 검증
const validateCheckUserId = [
  body('userId')
  .notEmpty().withMessage('아이디를 입력하세요.')
  .isString().withMessage('아이디는 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 닉네임 중복 확인 데이터 검증
const validateCheckNickname = [
  body('nickName')
  .notEmpty().withMessage('닉네임을 입력하세요.')
  .isString().withMessage('닉네임은 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 이메일 중복 확인 데이터 검증
const validateCheckEmail = [
  body('email')
  .isEmail().withMessage('유효한 이메일 주소를 입력하세요.')
  .isString().withMessage('이메일은 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 기존 비밀번호 확인 데이터 검증
const validateCheckPassword = [
  body('password')
  .notEmpty().withMessage('비밀번호를 입력하세요.')
  .isString().withMessage('비밀번호는 문자열 Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

// 사용자 정보 수정 데이터 검증
const validateUpdateUserInfo = [
  body('nickName').optional()
  .notEmpty().withMessage('닉네임을 입력하세요.')
  .isString().withMessage('닉네임은 문자열 Type이어야 합니다.'),
  body('password').optional()
  .notEmpty().withMessage('비밀번호를 입력하세요.')
  .isString().withMessage('비밀번호는 문자열 Type이어야 합니다.'),
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

//인증번호 확인 데이터 검증
const validateAuthNumber = [
  body('authNumber')
  .notEmpty().withMessage('인증번호를 입력하세요.')
  .isNumeric().withMessage('인증번호는 Number Type이어야 합니다.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: null, error: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = {
  validateSignUp,
  validateSignIn,
  validateCheckUserId,
  validateCheckNickname,
  validateCheckEmail,
  validateCheckPassword,
  validateUpdateUserInfo,
  validateAuthNumber,
};