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
				return { message: "DUPILCATED ID" };
			}
			const existNickName = await User.findOne({ nickName: user.nickName });
			if (existNickName !== null) {
				return { message: "DUPILCATED NICKNAME" };
			}

			//bcrypt 비밀번호 암호화
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;

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
		};

		const expiredToken = jwt.sign(payload, secretKey);

		return {
			message: "SUCCESS",
			token: expiredToken,
		};
	}

	//내 정보 조회
	async getUserInfo() {
		try {
			const matched_user = await User.findOne(
				{ _id: _id },
				{ nickname: 1, user_id: 1, user_email: 1, image_url: 1 }
			);
			if (matched_user) {
				return { message: "회원정보 조회 완료", user: matched_user };
			} else {
				throw { message: "일치하는 회원정보가 없습니다." };
			}
		} catch (err) {
			return err;
		}
	}

	//회원정보 수정
	async updateUserInfo(_id, user) {
		try {
			const matched_user = await User.findOneAndUpdate(
				{ _id: _id },
				{
					nickname: user.nickname,
					user_id: user.user_id,
					new_password: user.password,
				},
				{ new: true }
			);
			if (matched_user) {
				return { message: "회원정보 수정 완료", user: matched_user };
			} else {
				throw { message: "회원정보 수정 실패" };
			}
		} catch (err) {
			return err;
		}
	}

	//회원탈퇴
	async deleteUserInfo(_id) {
		try {
			const deleteUser = await User.findOneAndDelete({ _id: _id });

			if (deleteUser) {
				return { message: "회원 탈퇴 완료" };
			} else {
				throw { message: "회원 탈퇴 실패" };
			}
		} catch (err) {
			return err;
		}
	}
}

module.exports = UserService;
