const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
	const secretKey = process.env.JWT_SECRET_KEY;

	try {
		const userToken = req.headers.cookie
			? req.headers.cookie.split("%20")[1] || null
			: null;
		const decoded = jwt.verify(userToken, secretKey);
		req.currentUserId = decoded.userId;

		next();
	} catch (error) {
		handleError(res, error);
	}
}
function handleError(res, error) {
	const status = error.status || 500;
	res.status(status).json({
		error: error.message || "Internal Server Error",
		data: null,
	});
}

module.exports = authenticateUser;
