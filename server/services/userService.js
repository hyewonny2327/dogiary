const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

class UserService {
	//회원가입
	async signUp({ email, userId, nickName, password, imageUrl }) {
		const user = { email, userId, nickName, password, imageUrl };

		try {
			const existUserId = await User.findOne({ userId: user.userId });
			if (existUserId !== null) {
				return { message: "DUPLICATED ID" };
			}
			const existNickName = await User.findOne({ nickName: user.nickName });
			if (existNickName !== null) {
				return { message: "DUPLICATED NICKNAME" };
			}

			//bcrypt 비밀번호 암호화
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
			const existUser = await User.findOne({ userId: user.userId });

			if (!existUser) {
				return { message: "NO EXIST USER" };
			}

			const isPasswordValid = await bcrypt.compare(
				user.password,
				existUser.password
			);

			if (isPasswordValid) {
				const payload = {
					userId: existUser.userId,
					email: existUser.email,
					nickName: existUser.nickName,
				};
				const secretKey = process.env.JWT_SECRET_KEY;
				const token = jwt.sign(payload, secretKey);

				return {
					message: "SUCCESS LOGIN",
					token: token,
				};
			} else {
				throw { message: "NOT MATCHED" };
			}
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
				{ nickName: 1, userId: 1, userEmail: 1, imageUrl: 1 }
			);
			if (matchedUser) {
				return { message: "SUCCESS", user: matchedUser };
			} else {
				throw { message: "NOT MATCHED" };
			}
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
			} else {
				throw { message: "NOT MATCHED" };
			}
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
			} else {
				throw { message: "NOT MATCHED" };
			}
		} catch (err) {
			return err;
		}
	}

	//기존 비밀번호 확인
	async checkPassword(userId, password) {
		try {
			const existUser = await User.findOne({ userId: userId });

			const isPasswordValid = await bcrypt.compare(
				password,
				existUser.password
			);

			if (isPasswordValid) {
				return { message: "SUCCESS" };
			} else {
				throw { message: "NOT MATCHED" };
			}
		} catch (err) {
			return err;
		}
	}

	//아이디 중복 확인
	async checkId(data) {
		try {
			const existUser = await User.findOne({ userId: data.userId });
			if (existUser) {
				return { message: "DUPLICATED" };
			} else {
				throw { message: "SUCCESS" };
			}
		} catch (err) {
			return err;
		}
	}

	//닉네임 중복 확인
	async checkNickname(data) {
		try {
			const existUser = await User.findOne({ userId: data.nickName });
			if (existUser) {
				return { message: "DUPLICATED" };
			} else {
				throw { message: "SUCCESS" };
			}
		} catch (err) {
			return err;
		}
	}
}

module.exports = UserService;
