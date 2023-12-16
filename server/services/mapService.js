const Map = require("../models/mapModel.js");

const handleError = (operation, error) => {
	console.error(`${operation} 오류:`, error);
	throw { status: 500, message: "내부 서버 오류" };
};

const mapService = {
	// 마커 데이터 생성
	async createMap(mapData) {
		try {
			const mapProfile = await Map.create(mapData);
			return mapProfile;
		} catch (error) {
			handleError("맵 생성", error);
		}
	},

	// 마커 정보 수정
	async updateMap(id, mapData) {
		try {
			const mapProfile = await Map.findById(id);
			if (!mapProfile) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
			const updateMapProfile = await Map.updateOne(mapData);
			return updateMapProfile;
		} catch (error) {
			handleError("맵 업데이트", error);
		}
	},

	// 특정 마커 삭제
	async deleteMap(id) {
		try {
			const deleteMap = await Map.findByIdAndDelete(id);
			if (!deleteMap) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
			return deleteMap;
		} catch (error) {
			handleError("맵 삭제", error);
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
			handleError("맵 조회", error);
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
			handleError("모든 맵 조회", error);
		}
	},

	// 태그별 데이터 받아오기
	async getMapsByTag(tagName) {
		try {
			const mapsByTag = await Map.find({ tag: tagName }).lean();
			if (!mapsByTag || mapsByTag.length === 0) {
				throw {
					status: 404,
					message: `태그 '${tagName}'에 해당하는 맵 데이터가 존재하지 않습니다.`,
				};
			}
			return mapsByTag;
		} catch (error) {
			handleError("태그별 맵 조회", error);
		}
	},
};

module.exports = mapService;
