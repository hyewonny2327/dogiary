const errorHandler = require("../middlewares/errorHandler.js");
const commonErrors = require("../middlewares/commonErrors.js");
const User = require("../models/userModel");

const rankService = {
    // 추가
    async getRank(currentUserId) {
        const users = await User.find().sort({ count: -1 }).lean();
        if (!currentUserId) {
            throw new errorHandler(
                commonErrors.authorizationError,
                "해당 사용자에게 권한이 없습니다.",
                { statusCode: 403 }
            );
        }
        const currentUser = users.find((user) => user.userId === currentUserId);
        if (!currentUser) {
            throw new errorHandler(
                commonErrors.notFoundError,
                "해당 사용자를 찾을 수 없습니다.",
                { statusCode: 404 }
            );
        }
        const currentUserRank = users.indexOf(currentUser) + 1;
        return {
            topUsers: users.slice(0, 5),
            currentUserRank,
            currentUserInfo: currentUser,
        };
    },
};
module.exports = rankService;






module.exports = rankService;
