const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middlewares/authenticateUser.js');
const userController = require('../controllers/userController');
const { validateSignUp, validateSignIn, validateUpdateUserInfo, validateCheckPassword, validateCheckUserId, validateCheckNickname, validateCheckEmail, validateAuthNumber } = require('../middlewares/validators/validatorUser.js');
const userRouter = express.Router();
const { upload } = require('../utils/multer.js');

// 회원가입
userRouter.post('/sign-up', validateSignUp, userController.signUpUser);

//로그인
userRouter.post('/login', validateSignIn, userController.signInUser);

//로그아웃
userRouter.post('/logout', userController.signOutUser);

//내 정보 조회
userRouter.get('/my-page', authenticateUser, userController.getUserInformation);

//내 정보 수정
userRouter.put(
  '/my-page',
  authenticateUser,
  validateUpdateUserInfo,
  upload.single('imageUrl'),
  userController.updateUserInformation,
);

//회원탈퇴
userRouter.delete(
  '/my-page',
  authenticateUser,
  userController.deleteUserInfomation,
);

//기존 비밀번호 확인
userRouter.post(
  '/check-password',
  authenticateUser,
  validateCheckPassword,
  userController.checkUserPassword,
);

//아이디 중복 확인
userRouter.post('/check-id', validateCheckUserId, userController.checkUserId);

//닉네임 중복 확인
userRouter.post('/check-nickname', validateCheckNickname, userController.checkUserNickname);

//이메일 인증 (feat.이메일 중복확인)
userRouter.post('/check-email', validateCheckEmail, userController.checkUserEmail);

//임시 비밀번호 발급(비밀번호 찾기)
userRouter.post('/help', validateCheckEmail, userController.sendTemporaryPassword);

//아이디 찾기
userRouter.post('/find-id', validateCheckEmail, userController.sendUserId);

//이메일 인증번호 확인
userRouter.post('/check-number', validateAuthNumber, userController.checkAuthNumber);

module.exports = userRouter;
