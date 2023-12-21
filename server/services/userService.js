const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mail = require("../utils/mail");
const User = require("../models/userModel");
const errorHandler = require("../middlewares/errorHandler");
const commonErrors = require("../middlewares/commonErrors");

const userService = {
	//회원가입
	async signUp(userData) {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;
		const userProfile = await User.create(userData);
		return userProfile;
	},

	//로그인
	async signIn(user) {
		const existingUser = await User.findOne({ userId: user.userId });
		if (!existingUser) {
			throw new errorHandler(commonErrors.resourceNotFoundError, "존재하지 않는 아이디 입니다.", { statusCode: 404 });
		}
		const isPasswordValid = await bcrypt.compare(
			user.password,
			existingUser.password
		);
		if (!isPasswordValid) {
			throw new errorHandler(commonErrors.authorizationError, "잘못된 비밀번호 입니다.", { statusCode: 401 });
		}
		const payload = {
			userId: existingUser.userId,
			email: existingUser.email,
			nickName: existingUser.nickName,
		};
		const secretKey = process.env.JWT_SECRET_KEY;
		const token = jwt.sign(payload, secretKey);
		return { token: token };
	},

	//로그아웃
	async signOut(userToken) {
		const secretKey = process.env.JWT_SECRET_KEY;
		const jwtDecoded = jwt.verify(userToken, secretKey);
		const payload = {
			userId: jwtDecoded.userId,
			email: jwtDecoded.email,
			nickName: jwtDecoded.nickName,
		};
		const expiredToken = jwt.sign(payload, secretKey);
		return { token: expiredToken };
	},

	//내 정보 조회
	async getUserInfo(userId) {
		const matchedUser = await User.findOne(
			{ userId: userId },
			{ nickName: 1, userId: 1, email: 1, imageUrl: 1 }
		);
		return { matchedUser };
	},

	//내 정보 수정
	async updateUserInfo(userId, updatedProfile) {
		const hashedPassword = await bcrypt.hash(updatedProfile.password, 10);
		const matchedUser = await User.findOneAndUpdate(
			{ userId: userId },
			{
				nickName: updatedProfile.nickName,
				password: hashedPassword,
				imageUrl: updatedProfile.imageUrl,
			},
			{ new: true }
		);
		return { matchedUser };
	},

	//회원탈퇴
	async deleteUserInfo(userId) {
		const deleteUser = await User.findOneAndDelete({ userId: userId });
		if (!deleteUser) {
			throw new errorHandler(commonErrors.resourceNotFoundError, "유저 정보를 찾을 수 없습니다.", { statusCode: 404 });
		}
	},

	//기존 비밀번호 확인
	async checkPassword(userId, password) {
		const existingUser = await User.findOne({ userId: userId });

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordValid) {
			throw new errorHandler(commonErrors.authorizationError, "잘못된 비밀번호 입니다.", { statusCode: 401 });
		}
	},

	//아이디 중복 확인
	async checkId(userId) {
		const existingUser = await User.findOne({ userId: userId });
		if (existingUser) {
			throw new errorHandler(commonErrors.inputError, "이미 존재하는 아이디 입니다.", { statusCode: 400 });
		}
	},

	//닉네임 중복 확인
	async checkNickname(nickName) {
		const existingUser = await User.findOne({ nickName: nickName });
		if (existingUser) {
			throw new errorHandler(commonErrors.inputError, "이미 존재하는 닉네임 입니다.", { statusCode: 400 });
		}
	},

	//이메일 중복 확인
	async checkEmail(email) {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			throw new errorHandler(commonErrors.inputError, "이미 존재하는 이메일 입니다.", { statusCode: 400 });
		}
	},

	//이메일 인증
	async sendVerificationEmail(email) {
		const randomNumber = mail.generateRandomNumber(1111, 9999);
		const transporter = nodemailer.createTransport({
			pool: true,
			maxConnections: 1,
			service: "naver",
			host: "smtp.naver.com",
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: process.env.EMAIL_ID,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		const mailOptions = {
			from: process.env.EMAIL_ID,
			to: email,
			subject: "인증 관련 메일 입니다.",
			html: "<h1>인증번호를 입력해주세요. \n\n\n\n\n\n</h1>" + randomNumber
		};
		const sentEmail = await transporter.sendMail(mailOptions);
		transporter.close();
		if(!sentEmail) {
			throw new errorHandler("Internal Server Error", "이메일 전송 실패", { statusCode: 500 });
		}
		return { authNumber: randomNumber };
	},

	//임시 비밀번호 발급
	async sendPassword(email) {
		const matchedUser = await User.findOne({ email: email });

		if (!matchedUser) {
			throw new errorHandler(commonErrors.resourceNotFoundError, "존재하지 않는 회원 정보입니다.", { statusCode: 404 });
		}
		const randomPassword = mail.generateRandomPassword(11111111, 99999999);
		const hashedPassword = await bcrypt.hash(randomPassword, 10);
		const transporter = nodemailer.createTransport({
			pool: true,
			maxConnections: 1,
			service: "naver",
			host: "smtp.naver.com",
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: process.env.EMAIL_ID,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		const mailOptions = {
			from: process.env.EMAIL_ID,
			to: matchedUser.email,
			subject: "임시 비밀번호 관련 메일 입니다.",
			html: "<h1>임시 비밀번호를 입력해주세요. \n\n\n\n\n\n</h1>" + randomPassword
		};
		const sentEmail = await transporter.sendMail(mailOptions);
		transporter.close();
		if(!sentEmail) {
			throw new errorHandler("Internal Server Error", "이메일 전송 실패", { statusCode: 500 });
		}
		const updatedUser = await User.findOneAndUpdate(
			{ email: email },
			{ password: hashedPassword }, 
			{ new: true }
		);
		return { updatedPassword: randomPassword };
	},

	//아이디 찾기(이메일로 아이디 전송)
	async sendId(email) {
		const matchedUser = await User.findOne(
			{ email: email },
			{ userId: 1 }
		);

		if (!matchedUser) {
			throw new errorHandler(commonErrors.resourceNotFoundError, "존재하지 않는 회원 정보입니다.", { statusCode: 404 });
		}
		const transporter = nodemailer.createTransport({
			pool: true,
			maxConnections: 1,
			service: "naver",
			host: "smtp.naver.com",
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: process.env.EMAIL_ID,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		const mailOptions = {
			from: process.env.EMAIL_ID,
			to: email,
			subject: "요청하신 아이디 찾기 관련 메일 입니다.",
			html: "<h1>요청하신 아이디 입니다. \n\n\n\n\n\n</h1>" + matchedUser.userId
		};
		const sentEmail = await transporter.sendMail(mailOptions);
		transporter.close();
		if(!sentEmail) {
			throw new errorHandler("Internal Server Error", "이메일 전송 실패", { statusCode: 500 });
		}
	}
}

module.exports = userService;
