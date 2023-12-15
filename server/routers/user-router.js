const UserService = require("../services/user-service");
const { validatorSignup, validatorSignin } = require("../middlewares/validator");
const { Router } = require("express");

const userService = new UserService;
const userRouter = Router();

// 회원가입
userRouter.post("/sign-up", validatorSignup, async (req, res, next) => {
    try {
        const result = await userService.signUp(req.body);
        if(result.message === "SUCCESS SIGNUP") {
            res.status(201)
            .json(
                {
                    user: result.user,
                }
            );
            return;
        } else if(result.message === "DUPLICATED ID") {
            throw {status: 400, message: "이미 존재하는 아이디입니다."};
        } else if(result.message === "DUPLICATED NICKNAME") {
            throw {status: 400, message: "이미 존재하는 이메일입니다."};
        } else {
            throw {status: 404, message: "unknown error"};
        }
    } catch(err) {
        next(err);
    }
});

//로그인
userRouter.post("/login", validatorSignin, async(req, res, next) => {
    try {
        const result = await userService.signIn(req.body);
        
        if(result.message === "SUCCESS LOGIN") {
            // res.setHeader("Authorization", `Bearer ${result.token}`);
            res.cookie("Authorization", `Bearer ${result.token}`, {httpOnly: true});
            res.status(200)
            .json(
                {
                    token: result.token
                }
            );
            return;
        } else if(result.message === "NO EXIST USER") {
            throw {statue: 400, message: "아이디 및 비밀번호를 확인해주세요."}
        } else if(result.message === "NOT MATCHED") {
            throw {status: 400, message: "일치하지 않는 로그인 정보입니다."}
        } else {
            throw {status: 404, message: "unknown error"};
        }
    } catch (err) {
        next(err);
    }
});

//로그아웃
userRouter.post("/logout", async (req, res, next) => {
    // const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
    try {
        const result = await userService.signOut(userToken);
        if(result.message == "SUCCESS") {
            res.setHeader("Authorization", `Bearer ${result.token}`);
            res.status(204).send();
        } else {
            throw { status: 404, message: 'unknown error' };
        }
    } catch (err) {
        next(err);
    }
});

module.exports = {userRouter};