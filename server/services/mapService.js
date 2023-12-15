const Map = require("../models/mapModel.js");
const { ObjectId } = require("mongoose");

const mapService = {
	//마커 데이터 생성
	async createMap(mapData) {
		try {
			const mapProfile = await Map.create(mapData);
			return mapProfile;
		} catch (error) {
			console.error("Error creating map:", error);
			throw error;
		}
	},
	//마커 정보 수정
	async updateMap(id, mapData) {
		const mapProfile = await Map.findById(id);
		if (!mapProfile) {
			const error = new Error("해당 맵 데이터가 존재하지 않습니다.");
			throw error;
		}
		const updateMapProfile = await Map.updateOne(mapData);
		return updateMapProfile;
	},
	//특정 마커 삭제
	async deleteMap(id) {
		const deleteMap = await Map.findByIdAndDelete(id);
		if (!deleteMap) {
			const error = new Error("해당 맵 데이터가 존재하지 않습니다.");
			throw error;
		}
		return deleteMap;
	},
	//특정 마커 정보 조회
	async getOneMap(id) {
		const mapProfile = await Map.findById(id).lean();
		if (!mapProfile || mapProfile.length === 0) {
			const error = new Error("해당 맵 데이터가 존재하지 않습니다.");
			throw error;
		}
		return mapProfile;
	},
	//전체 정보 받아오기
	async getAllMaps() {
		const allMaps = await Map.find().lean();
		if (!allMaps || allMaps.length === 0) {
			const error = new Error("맵 데이터가 존재하지 않습니다.");
			throw error;
		}
		return allMaps;
	},
};

module.exports = mapService;
