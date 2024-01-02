const userService = require('../services/userService');
const User = require('../models/userModel');
const path = require('path');

const userController = {
  //회원가입
  async signUpUser(req, res, next) {
    try {
      const userData = req.body;
      const result = await userService.signUp(userData);

      res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  //로그인
  async signInUser(req, res, next) {
    try {
      const loginData = req.body;
      const result = await userService.signIn(loginData);

      res.status(200).json({
        error: null,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  //로그아웃
  async signOutUser(req, res, next) {
    try {
      const userToken = req.headers.authorization || null;
      const tokenValue = userToken.split('Bearer ')[1];
      const result = await userService.signOut(tokenValue);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  //내 정보 조회
  async getUserInformation(req, res, next) {
    try {
      const userId = req.currentUserId;

      const result = await userService.getUserInfo(userId);

      res.status(200).json({
        error: null,
        data: result.matchedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  //내 정보 수정
  async updateUserInformation(req, res, next) {
    try {
      const userId = req.currentUserId;

      const { nickName, password } = req.body;

      const checkNick = await userService.checkUserNickname(userId, nickName);

      const matchedUserImage = await User.findOne(
        { userId: userId },
        { imageUrl: 1 },
      );
      let imageUrl;

      if (req.file && req.file.filename !== undefined) {
        const imagePath = path.join(
          '/images',
          req.file.filename,
        );
        imageUrl = imagePath;
      } else {
        imageUrl = matchedUserImage.imageUrl;
      }

      const result = await userService.updateUserInfo(userId, {
        nickName,
        password,
        imageUrl,
      });

      res.status(200).json({
        error: null,
        data: result.matchedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  //회원탈퇴
  async deleteUserInfomation(req, res, next) {
    try {
      const userId = req.currentUserId;

      const result = await userService.deleteUserInfo(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  //기존 비밀번호 확인
  async checkUserPassword(req, res, next) {
    try {
      const userId = req.currentUserId;

      const { password } = req.body;

      const result = await userService.checkPassword(userId, password);
      res.status(200).json({
        error: null,
        data: { check: true },
      });
    } catch (error) {
      next(error);
    }
  },

  //아이디 중복 확인
  async checkUserId(req, res, next) {
    try {
      const { userId } = req.body;

      const result = await userService.checkId(userId);
      res.status(200).json({
        error: null,
        data: { check: true },
      });
    } catch (error) {
      next(error);
    }
  },

  //닉네임 중복 확인
  async checkUserNickname(req, res, next) {
    try {
      const { nickName } = req.body;

      const result = await userService.checkNickname(nickName);
      res.status(200).json({
        error: null,
        data: { check: true },
      });
    } catch (error) {
      next(error);
    }
  },

  //이메일 인증 (feat.이메일 중복확인)
  async checkUserEmail(req, res, next) {
    try {
      const { email } = req.body;

      const resultCheckEmail = await userService.checkEmail(email);
      const resultAuthEmail = await userService.sendVerificationEmail(email);
      res.status(200).json({
        error: null,
        data: { check: true, authNumber: resultAuthEmail.authNumber },
      });
    } catch (error) {
      next(error);
    }
  },

  //임시 비밀번호 발급
  async sendTemporaryPassword(req, res, next) {
    try {
      const { email } = req.body;

      const result = await userService.sendPassword(email);
      res.status(200).json({
        error: null,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  //아이디 찾기
  async sendUserId(req, res, next) {
    try {
      const { email } = req.body;

      const result = await userService.sendId(email);
      res.status(200).json({ message: '아이디 전송이 완료되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  //이메일 인증번호 확인
  async checkAuthNumber(req, res, next) {
    try {
      const { email, inputAuthNumber } = req.body;

      const result = await userService.checkNumber(email, inputAuthNumber);
      res.status(200).json({ check: true });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
