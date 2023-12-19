const userService = require("../services/userService");

const userController = {
    //회원가입
    async signUpUser(req, res, next) {
        try {
            const userData = req.body;
            const result = await userService.signUp(userData);

            res.status(201).json({ message: "Data created successfully" });
        } catch (error) {
            next(error);
        }
    },

    //로그인
    async signInUser(req, res, next) {
        try {
            const loginData = req.body;
            const result = await userService.signIn(loginData);

            res.cookie("Authorization", `Bearer ${result.token}`, { httpOnly: true });
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
        try{
            // const userToken = req.cookies.Authorization?.split(" ")[1] ?? "null";
            const userToken = req.headers.cookie.split("%20")[1] ?? "null";
            const result = await userService.signOut(userToken);

            res.clearCookie("Authorization");
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
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },

    //내 정보 수정
    async updateUserInformation(req, res, next) {
        try {
            const userId = req.currentUserId;

            const updatedProfile = req.body;

            const result = await userService.updateUserInfo(userId, updatedProfile);

            res.status(200).json({
                error: null,
                data: result,
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
            const { userId } = req.body;

            const result = await userService.sendPassword(userId);
            res.status(200).json({
                error: null,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;