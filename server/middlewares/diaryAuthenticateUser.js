const jwt = require("jsonwebtoken");

const diaryAuthenticateUser = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const userToken = req.headers.cookie?.split("%20")[1] ?? "null";

  if (!userToken) {
    return res.status(401).json({ error: "인증 토큰이 누락되었습니다." });
  }

  try {
    const decodedToken = jwt.verify(userToken, secretKey);
    // 토큰에서 사용자 ID 추출
    req.currentUserId = decodedToken.userId;

    next();
  } catch (err) {
    console.error("인증 오류", err);
    return res.status(401).json({ error: "인증되지 않음. 잘못된 토큰." });
  }
};

module.exports = diaryAuthenticateUser;
