const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mail = require("../utils/mail");
const { User } = require("../models/userModel");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

class UserService {
	//회원가입
	async signUp({ email, userId, nickName, password, imageUrl }) {
		const user = { email, userId, nickName, password, imageUrl };
		try {
			const existingUser = await User.findOne({ userId: user.userId });
			if (existingUser !== null) {
				return { message: "DUPLICATED ID" };
			}
			const existingNickname = await User.findOne({ nickName: user.nickName });
			if (existingNickname !== null) {
				return { message: "DUPLICATED NICKNAME" };
			}
			const hashedPassword = await bcrypt.hash(user.password, 10);
			user.password = hashedPassword;
			const newUser = await User.create(user);
			return { message: "SUCCESS SIGNUP", user: newUser };
		} catch (err) {
			return err;
		}
	}

	//로그인
	async signIn(user) {
		try {
			const existingUser = await User.findOne({ userId: user.userId });
			if (!existingUser) {
				return { message: "NO EXIST USER" };
			}
			const isPasswordValid = await bcrypt.compare(
				user.password,
				existingUser.password
			);
			if (isPasswordValid) {
				const payload = {
					userId: existingUser.userId,
					email: existingUser.email,
					nickName: existingUser.nickName,
				};
				const secretKey = process.env.JWT_SECRET_KEY;
				const token = jwt.sign(payload, secretKey);

				return {
					message: "SUCCESS LOGIN",
					token: token,
				};
			}
			throw new Error("NOT MATCHED");
		} catch (err) {
			return err;
		}
	}

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
		return {
			message: "SUCCESS",
			token: expiredToken,
		};
	}

	//내 정보 조회
	async getUserInfo(userId) {
		try {
			const matchedUser = await User.findOne(
				{ userId: userId },
				{ nickName: 1, userId: 1, email: 1, imageUrl: 1 }
			);
			if (matchedUser) {
				return { message: "SUCCESS", user: matchedUser };
			}
			throw new Error("NOT MATCHED");
		} catch (err) {
			return err;
		}
	}

	//내 정보 수정
	async updateUserInfo(userId, data) {
		try {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			const matchedUser = await User.findOneAndUpdate(
				{ userId: userId },
				{
					nickName: data.nickName,
					password: hashedPassword,
					imageUrl: data.imageUrl,
				},
				{ new: true }
			);
			if (matchedUser) {
				return { message: "SUCCESS", user: matchedUser };
			} 
			throw new Error("NOT MATCHED");
		} catch (err) {
			return err;
		}
	}

	//회원탈퇴
	async deleteUserInfo(userId) {
		try {
			const deleteUser = await User.findOneAndDelete({ userId: userId });
			if (deleteUser) {
				return { message: "SUCCESS" };
			}
			throw new Error("NOT MATCHED");
		} catch (err) {
			return err;
		}
	}

	//기존 비밀번호 확인
	async checkPassword(userId, password) {
		try {
			const existingUser = await User.findOne({ userId: userId });

			const isPasswordValid = await bcrypt.compare(
				password,
				existingUser.password
			);
			if (isPasswordValid) {
				return { message: "SUCCESS" };
			}
			throw new Error("NOT MATCHED");
		} catch (err) {
			return err;
		}
	}

	//아이디 중복 확인
	async checkId(userId) {
		try {
			const existingUser = await User.findOne({ userId: userId });
			if (!existingUser) {
				return { message: "SUCCESS" };
			}
			throw new Error("DUPLICATED");
		} catch (err) {
			return err;
		}
	}

	//닉네임 중복 확인
	async checkNickname(data) {
		try {
			const existingUser = await User.findOne({ userId: data.nickName });
			if (!existingUser) {
				return { message: "SUCCESS" };
			}
			throw new Error("DUPLICATED");
		} catch (err) {
			return err;
		}
	}

	//이메일 중복 확인
	async checkEmail(email) {
		try {
			const existingUser = await User.findOne({ email: email });
			if (!existingUser) {
				return { message: "SUCCESS" };
			}
			throw new Error("DUPLICATED");
		} catch (err) {
			throw err;
		}
	}

	//이메일 인증
	async sendVerificationEmail(email) {
		try {
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
			if(sentEmail) {
				return { message: "SUCCESS", authNumber: randomNumber};
			}
			throw new Error("FAILED");
		} catch (err) {
			throw err;
		}
	}

	//임시 비밀번호 발급
	async sendTemporaryPassword(userId) {
		try {
			const matchedUser = await User.findOne(
				{ userId: userId },
				{ email: 1 }
			);
			if (matchedUser) {
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
					html: "<h1>임시 비밀번호를 입력해주세요. \n\n\n\n\n\n</h1>" + hashedPassword
				};
				const sentEmail = await transporter.sendMail(mailOptions);
				transporter.close();
				if(sentEmail) {
					const matchedUser = await User.findOneAndUpdate(
						{ userId: userId },
						{ password: hashedPassword },
						{ new: true }
					);
					return { message: "SUCCESS", tempPassword: hashedPassword};
				}
			}
			throw new Error("FAILED");
		} catch (err) {
			throw err;
		}
	}
}

module.exports = UserService;
