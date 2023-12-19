const Map = require("../models/mapModel.js");
const mapService = {
	// 마커 데이터 생성
	async createMap(mapData, currentUserId) {
		try {
			if (!currentUserId) {
				throw { status: 400, message: "사용자 ID가 제공되지 않았습니다." };
			}
			mapData.userId = currentUserId;
			const mapProfile = await Map.create(mapData);
			const mapObject = mapProfile.toObject();
			return mapObject;
		} catch (error) {
			throw error;
		}
	},
	// 마커 정보 수정
	async updatedMapProfile(id, mapData, currentUserId) {
		try {
			const mapProfile = await Map.findById(id).lean();
			if (!mapProfile) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
			if (mapProfile.userId !== currentUserId) {
				throw { status: 403, message: "해당 사용자에게 삭제 권한이 없습니다." };
			}
			// 업데이트 수행
			const updateResult = await Map.updateOne({ _id: id }, mapData).lean();

			if (updateResult.modifiedCount !== 1) {
				// 업데이트된 문서의 수가 1이 아닌 경우 처리
				const error = new Error("마커 업데이트에 실패했습니다.");
				throw error;
			}

			// 업데이트된 맵 데이터를 다시 조회하여 반환
			const updatedMapProfile = await Map.findById(id).lean();
			return updatedMapProfile;
		} catch (error) {
			throw error;
		}
	},

	async deleteMap(id, currentUserId) {
		try {
			const mapToDelete = await Map.findById(id);
			if (!mapToDelete) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
			if (mapToDelete.userId !== currentUserId) {
				throw { status: 403, message: "해당 사용자에게 삭제 권한이 없습니다." };
			}
			const deleteMap = await Map.findByIdAndDelete(id);
			return deleteMap;
		} catch (error) {
			throw error;
		}
	},

	// 특정 마커 정보 조회
	async getOneMap(id) {
		try {
			const mapProfile = await Map.findById(id).lean();
			if (!mapProfile || mapProfile.length === 0) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
			return mapProfile;
		} catch (error) {
			throw error;
		}
	},

	// 전체 정보 받아오기
	async getAllMaps() {
		try {
			const allMaps = await Map.find().lean();
			if (!allMaps || allMaps.length === 0) {
				throw { status: 404, message: "맵 데이터가 존재하지 않습니다." };
			}
			return allMaps;
		} catch (error) {
			throw error; // 예외를 던져서 컨트롤러에서 처리할 수 있도록 함
		}
	},

	// 태그별 데이터 받아오기

	async getMapsByTag(tagName) {
		try {
			if (!isValidTag(tagName)) {
				throw { status: 400, message: "올바른 태그 형식이 아닙니다." };
			}
			const mapsByTag = await Map.find({ tag: tagName }).lean();
			if (!mapsByTag || mapsByTag.length === 0) {
				throw {
					status: 404,
					message: `태그 '${tagName}'에 해당하는 맵 데이터가 존재하지 않습니다.`,
				};
			}
			return mapsByTag;
		} catch (error) {
			throw error;
		}
	},
	async getMyMaps(currentUserId) {
		try {
			const mapsByUser = await Map.find({ userId: currentUserId }).lean();
			if (!mapsByUser || mapsByUser.length === 0) {
				throw {
					status: 404,
					message: `해당 사용자의 맵 데이터가 존재하지 않습니다.`,
				};
			}
			return mapsByUser;
		} catch (error) {
			throw error;
		}
	},
};

function isValidTag(tagName) {
	return typeof tagName === "string" && tagName.length > 0;
}
module.exports = mapService;
