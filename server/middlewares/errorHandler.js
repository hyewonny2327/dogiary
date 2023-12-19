// errorHandler.js
const errorHandler = (err, req, res, next) => {
	// 기본적으로 500 Internal Server Error로 설정
	let statusCode = 500;
	let errorMessage = "Internal Server Error";

	// 에러 객체에 상태 코드가 지정되어 있는지 확인하고 설정
	if (err.statusCode) {
		statusCode = err.statusCode;
		errorMessage = err.message;
	}

	// 에러 로그 출력
	console.error(err.stack);

	// 클라이언트에게 에러 응답 전송
	res.status(statusCode).json({
		success: false,
		message: errorMessage,
	});
};

module.exports = errorHandler;
