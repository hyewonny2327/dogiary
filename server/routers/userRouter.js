const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const {
	validateSignUp,
	validateSignIn,
} = require("../middlewares/validator");
const { Router } = require("express");

const userService = new UserService();
const userRouter = Router();

// 회원가입
userRouter.post("/sign-up", validateSignUp, async (req, res, next) => {
	try {
		const result = await userService.signUp(req.body);
		if (result.message === "SUCCESS SIGNUP") {
			res.status(201).json(result.user);
			return;
		} else if (result.message === "DUPLICATED ID") {
			throw { status: 400, message: "이미 존재하는 아이디입니다." };
		} else if (result.message === "DUPLICATED NICKNAME") {
			throw { status: 400, message: "이미 존재하는 이메일입니다." };
		} else {
			throw { status: 404, message: "unknown error" };
		}
	} catch (err) {
		next(err);
	}
});

//로그인
userRouter.post("/login", validateSignIn, async (req, res, next) => {
	try {
		const result = await userService.signIn(req.body);

		if (result.message === "SUCCESS LOGIN") {
			// res.setHeader("Authorization", `Bearer ${result.token}`);
			res.cookie("Authorization", `Bearer ${result.token}`, { httpOnly: true });
			res.status(200).json({
				token: result.token,
			});
			return;
		}
	} catch (err) {
		if (result.message === "NO EXIST USER") {
			next({ statue: 400, message: "아이디 및 비밀번호를 확인해주세요." });
		} else if (result.message === "NOT MATCHED") {
			next({ status: 400, message: "일치하지 않는 로그인 정보입니다." });
		} else {
			next({ status: 404, message: "unknown error" });
		}
	}
});

//로그아웃
userRouter.post("/logout", async (req, res, next) => {
	const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
	try {
		const result = await userService.signOut(userToken);
		if (result.message == "SUCCESS") {
			res.clearCookie("Authorization");
			res.status(204).send();
		}
	} catch (err) {
		next({ status: 404, message: "unknown error" });
	}
});

//내 정보 조회
userRouter.get("/my-page", async (req, res, next) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	console.log(req.headers.cookie);
	const userToken = req.headers.cookie.split("%20")[1] ?? "null";
	const decoded = jwt.verify(userToken, secretKey);
	const userId = decoded.userId;
	try {
		const result = await userService.getUserInfo(userId);
		if(result.message === "SUCCESS") {
			res.status(200).json(result.user);
			return;
		}
	} catch (err) {
		if (err.message === "NOT MATCHED") {
			next({status: 404, message: "존재하지 않는 계정입니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});

//내 정보 수정
userRouter.put("/my-page", async (req, res, next) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	// const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
	const userToken = req.headers.cookie.split("%20")[1] ?? "null";
	const decoded = jwt.verify(userToken, secretKey);
	const userId = decoded.userId;

	const {nickName, password, imageUrl} = req.body;

	try {
		const result = await userService.updateUserInfo(userId, {nickName, password, imageUrl});
		if(result.message === "SUCCESS") {
			res.status(200).json(result.user);
			return;
		}
	} catch (err) {
		if (err.message === "NOT MATCHED") {
			next({status: 404, message: "존재하지 않는 계정입니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});


//회원탈퇴
userRouter.delete("/my-page", async (req, res, next) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	// const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
	const userToken = req.headers.cookie.split("%20")[1] ?? "null";
	const decoded = jwt.verify(userToken, secretKey);
	const userId = decoded.userId;
	try {
		const result = await userService.deleteUserInfo(userId);
		if(result.message === "SUCCESS") {
			res.status(204).send();
		}
	} catch (err) {
		if (err.message === "NOT MATCHED") {
			next({status: 400, message: "존재하지 않는 계정입니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});

//기존 비밀번호 확인
userRouter.get("/check-password", async (req, res, next) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	// const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
	const userToken = req.headers.cookie.split("%20")[1] ?? "null";
	const decoded = jwt.verify(userToken, secretKey);
	const userId = decoded.userId;
	const { password } = req.body;
	try {
		const result = await userService.checkPassword(userId, password);
		if(result.message === "SUCCESS") {
			res.status(200).json({check: true});
		}
	} catch (err) {
		if (err.message === "NOT MATCHED") {
			next({status: 400, message: "비밀번호가 일치하지 않습니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});


//아이디 중복 확인
userRouter.get("/check-id", async (req, res, next) => {
	const { userId } = req.body;
	try {
		const result = await userService.checkId(userId);
		if(result.message === "SUCCESS") {
			res.status(200).json({check: true});
		}
	} catch (err) {
		if (err.message === "DUPLICATED") {
			next({status: 400, message: "동일한 아이디가 존재합니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});

//닉네임 중복 확인
userRouter.get("/check-nickname", async (req, res, next) => {
	try {
		const result = await userService.checkNickname(req.body);
		if(result.message === "SUCCESS") {
			res.status(200).json({check: true});
		}
	} catch (err) {
		if (err.message === "DUPLICATED") {
			next({status: 400, message: "동일한 닉네임이 존재합니다."});
		} else {
			next({status: 404, message: "unknown error"});
		}
	}
});

//이메일 인증 (feat.이메일 중복확인)
userRouter.get("/check-email", async (req, res, next) => {
	const { email } = req.body;
	try {
		const resultCheckEmail = await userService.checkEmail(email);
		const resultAuthEmail = await userService.sendVerificationEmail(email);
		if((resultCheckEmail.message === "SUCCESS") && (resultAuthEmail.message === "SUCCESS")){
			res.status(200).json({check: true, authNumber: resultAuthEmail.authNumber});
		}
	} catch (err) {
		next(err);
	}
});

//임시 비밀번호 발급
userRouter.get("/help", async (req, res, next) => {
	const { userId } = req.body;
	try {
		const result = await userService.sendTemporaryPassword(userId);
		if(result.message === "SUCCESSS") {
			res.status(200).json(result.tempPassword);
			return;
		}
	} catch (err) {
		next(err);
	}
})

module.exports = { userRouter };
