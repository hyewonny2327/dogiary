const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonErrors.js");
const medicalService = {
  // 진료기록 추가
  async createMedical(dogId, medicalData, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    dog.medicals.push(medicalData);
    const updatedDog = await dog.save();
    return updatedDog.medicals[updatedDog.medicals.length - 1]; // return the newly added medical record
  },
  // 진료기록 가져오기(무한 스크롤)
  async getMedicalById(dogId, currentUserId, cursor, pageSize = 3) {
    const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    let medical = dog.medicals;
    if (cursor) {
      medical = medical.filter(
        (item) => new Date(item.date) < new Date(cursor)
      );
    }
    medical.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!medical) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }
    // 페이징 처리
    let startIndex = 0;
    if (cursor) {
      // 현재 페이지의 시작 인덱스를 찾아내기
      startIndex = medical.findIndex(
        (item) => new Date(item.date) <= new Date(cursor)
      );
      if (startIndex === -1) {
        // 커서의 날짜보다 이전 데이터가 없을 경우 처음부터 반환
        return null;
      }
    }
    const endIndex = startIndex + pageSize;
    const slicedMedical = medical.slice(startIndex, endIndex);

    return slicedMedical;
  },
  // 진료기록 가져오기 3개
  async getMedical3ById(dogId, currentUserId) {
    const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const medical = dog.medicals
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    if (!medical) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }
    return medical;
  },
  // 진료기록 정보 업데이트
  async updateMedical(dogId, medicalId, updatedWeightData, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const medical = dog.medicals.id(medicalId);

    if (!medical) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }

    medical.set(updatedWeightData);
    const updatedDog = await dog.save();
    return updatedDog.medicals.id(medicalId);
  },

  // 진료기록 삭제
  async deleteMedical(dogId, medicalId, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const medicalIndex = dog.medicals.findIndex(
      (w) => w._id.toString() === medicalId
    );

    if (medicalIndex === -1) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }

    dog.medicals.splice(medicalIndex, 1);
    const updatedDog = await dog.save();

    return updatedDog;
  },
};

module.exports = medicalService;
