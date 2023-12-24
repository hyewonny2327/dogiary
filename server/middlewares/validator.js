function validateSignUp(req, res, next) {
  const { userId, password } = req.body;

  if (!userId || !password) {
    //인증을 거치기 전 기능이기 때문에 401에서 400으로 수정
    //400 Bad Request
    //401 Unauthorized
    res.status(400).json({ message: '아이디, 비밀번호는 필수입니다.' });
    return;
  }
  next();
}

function validateSignIn(req, res, next) {
  const { userId, password } = req.body;

  if (!userId || !password) {
    //인증을 거치기 전 기능이기 때문에 401에서 400으로 수정
    res.status(400).json({ message: '아이디, 비밀번호는 필수입니다.' });
    return;
  }
  next();
}

module.exports = { validateSignUp, validateSignIn };
