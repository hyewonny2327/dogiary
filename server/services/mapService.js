const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonErrors.js");
const Map = require("../models/mapModel.js");
const User = require("../models/userModel.js");
const mapService = {
	// 마커 데이터 생성
	async createMap(mapData, currentUserId) {
		if (!currentUserId) {
			throw new errorHandler(
				commonErrors.argumentError,
				"데이터를 받아오지 못했습니다.",
				{ statusCode: 400 }
			);
		}
		mapData.userId = currentUserId;
		if (mapData.toggle == true) {
			// 사용자 찾기
			const user = await User.findOne({ userId: currentUserId });

			if (!user) {
				throw new errorHandler(
					commonErrors.notFound,
					"사용자를 찾을 수 없습니다.",
					{ statusCode: 404 }
				);
			}

			// count 증가
			user.count = (user.count || 0) + 1;
			// 저장
			await user.save();
		}
		const mapProfile = await Map.create(mapData);
		const mapObject = mapProfile.toObject();
		return mapObject;
	},
	// 마커 정보 수정
	async updatedMapProfile(id, mapData, currentUserId) {
		// currentUserId;
		const mapProfile = await Map.findById(id).lean();
		if (!mapProfile) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}

		if (mapProfile.userId !== currentUserId) {
			throw new errorHandler(
				commonErrors.authorizationError,
				"해당 사용자에게 권한이 없습니다.",
				{ statusCode: 403 }
			);
		}
		// 업데이트 수행
		const updatedResult = await Map.updateOne({ _id: id }, mapData).lean();

		if (updatedResult.modifiedCount !== 1) {
			// 업데이트된 문서의 수가 1이 아닌 경우 처리
			throw new errorHandler(
				commonErrors.configError,
				"서버시스템에 문제로 인해 업데이트에 실패하였습니다..",
				{ statusCode: 500 }
			);
		}

		// 업데이트된 맵 데이터를 다시 조회하여 반환
		const updatedMapProfile = await Map.findById(id).lean();
		return updatedMapProfile;
	},

	async deleteMap(id, currentUserId) {
		try {
			const mapToDelete = await Map.findById(id);
			if (!mapToDelete) {
				throw new errorHandler(
					commonErrors.resourceNotFoundError,
					"해당 데이터를 찾을수없습니다.",
					{ statusCode: 404 }
				);
			}
			if (mapToDelete.userId !== currentUserId) {
				throw new errorHandler(
					commonErrors.authorizationError,
					"해당 사용자에게 권한이 없습니다.",
					{ statusCode: 403 }
				);
			}
			const deletedMap = await Map.findByIdAndDelete(id);
			return deletedMap;
		} catch (error) {
			throw error;
		}
	},

	// 특정 마커 정보 조회
	async getOneMap(id) {
		const mapProfile = await Map.findById(id).lean();
		if (!mapProfile || mapProfile.length === 0) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}
		return mapProfile;
	},

	// 전체 정보 받아오기
	async getAllMaps() {
		const allMaps = await Map.find({ toggle: true }).lean();
		if (!allMaps || allMaps.length === 0) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}
		return allMaps;
	},

	// 태그별 데이터 받아오기
	async getMapsByTag(tagName) {
		if (!isValidTag(tagName)) {
			throw { status: 400, message: "올바른 태그 형식이 아닙니다." };
		}
		const mapsByTag = await Map.find({ tag: tagName }).lean();
		if (!mapsByTag || mapsByTag.length === 0) {
			throw new errorHandler(
				commonErrors.resourceNotFoundError,
				"해당 데이터를 찾을수없습니다.",
				{ statusCode: 404 }
			);
		}
		return mapsByTag;
	},
	// 가져오기 (커서 기반 페이지네이션 및 제한된 개수)
	async getMyMaps(currentUserId, cursor) {
		try {
			let query = { userId: currentUserId };
			if (cursor) {
				query._id = { $lt: cursor };
			}
			const myMaps = await Map.find(query)
				.sort({ createdAt: -1 })
				.limit(5)
				.lean();
			if (!myMaps || myMaps.length === 0) {
				return null;
			}
			return myMaps;
		} catch (error) {
			throw error;
		}
	},
};

function isValidTag(tagName) {
	return typeof tagName === "string" && tagName.length > 0;
}
module.exports = mapService;
