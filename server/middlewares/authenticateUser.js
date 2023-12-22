const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  // const userToken = req.headers.cookie?.split("%20")[1] ?? "null";
  const userToken = req.headers.authorization || null;
  
  if (!userToken) {
    return res.status(401).json({ error: "인증 토큰이 누락되었습니다." });
  }

  try {
    const tokenValue = userToken.split("Bearer ")[1];
    const decodedToken = jwt.verify(tokenValue, secretKey);
    // 토큰에서 사용자 ID 추출
    req.currentUserId = decodedToken.userId;

    next();
  } catch (err) {
    console.error("인증 오류", err);
    return res.status(401).json({ error: "인증되지 않음. 잘못된 토큰." });
  }
};

module.exports = authenticateUser;
