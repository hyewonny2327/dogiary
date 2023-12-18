const Map = require("../models/mapModel.js");

const mapService = {
	// 마커 데이터 생성
	async createMap(mapData) {
		try {
			const mapProfile = await Map.create(mapData);
			const mapObject = mapProfile.toObject();
			return mapObject;
		} catch (error) {
			throw error;
		}
	},
	// 마커 정보 수정
	async updatedMapProfile(id, mapData) {
		try {
			const mapProfile = await Map.findById(id).lean();
			if (!mapProfile) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
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

	// 특정 마커 삭제
	async deleteMap(id) {
		try {
			const deleteMap = await Map.findByIdAndDelete(id);
			if (!deleteMap) {
				throw { status: 404, message: "해당 맵 데이터가 존재하지 않습니다." };
			}
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
			// 태그 형식을 검증
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
};
function isValidTag(tagName) {
	return typeof tagName === "string" && tagName.length > 0;
}
module.exports = mapService;
