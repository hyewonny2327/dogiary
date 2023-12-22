const mapService = require("../services/mapService.js");
const errorHandler = require("../middlewares/errorHandler.js");
const rankService = require("../services/rankService.js");
const commonErrors = require("../middlewares/commonErrors.js");

const rankController = {
	async getRank(req, res, next) {
		try {
			const currentUserId = req.currentUserId;
			const rank = await rankService.getRank(currentUserId);
			res.json({
				error: null,
				data: rank,
			});
		} catch (error) {
			next(error);
		}
	},
};

module.exports = rankController;
