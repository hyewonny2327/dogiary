const Dog = require('../models/dogModel.js');
const errorHandler = require('../middlewares/errorHandler.js');
const commonErrors = require('../middlewares/commonErrors.js');

const weightService = {
  // 몸무게 추가
  async createWeight(dogId, weightData, currentUserId) {
    const dog = await Dog.findById(dogId);
    weightData.userId = currentUserId;
    dog.weights.push(weightData);
    const updatedDog = await dog.save();
    return updatedDog.weights[updatedDog.weights.length - 1];
  },
  // 몸무게 가져오기 무한스크롤 10개
  async getWeightById(dogId, currentUserId, cursor, pageSize = 10) {
    const dog = await Dog.findById(dogId).sort({ _id: -1 }).exec();
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 403 },
      );
    }
    let weights = dog.weights;
    if (cursor) {
      weights = weights.filter((item) => item._id < cursor);
    }
    // 내림차순 정렬
    weights.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
    if (!weights || weights.length === 0) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        '해당 자료를 찾을 수 없습니다.',
        { statusCode: 404 },
      );
    }
    // 페이징 처리
    let startIndex = 0;
    if (cursor) {
      // 현재 페이지의 시작 인덱스를 찾아내기
      startIndex = weights.findIndex((item) => item._id <= cursor);
      if (startIndex === -1) {
        // 커서의 날짜보다 이전 데이터가 없을 경우 처음부터 반환
        return null;
      }
    }
    const endIndex = startIndex + pageSize;
    const slicedWeights = weights.slice(startIndex, endIndex);
    return slicedWeights;
  },
  // 몸무게 정보 업데이트
  async updateWeight(dogId, weightId, updatedWeightData, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 403 },
      );
    }
    const weight = dog.weights.id(weightId);
    if (!weight) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        '해당 데이터를 찾을수없습니다.',
        { statusCode: 404 },
      );
    }

    weight.set(updatedWeightData);
    const updatedWeight = await dog.save();
    return updatedWeight.weights.id(weightId);
  },
  async deleteWeight(dogId, weightId, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new AppError(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 403 },
      );
    }
    const weightIndex = dog.weights.findIndex(
      (w) => w._id.toString() === weightId,
    );
    if (weightIndex === -1) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 데이터를 찾을수없습니다.',
        { statusCode: 404 },
      );
    }
    dog.weights.splice(weightIndex, 1);
    const updatedDog = await dog.save();
    if (!updatedDog) {
      throw new AppError(
        commonErrors.configError,
        '서버시스템에 문제로 인해 삭제에 실패하였습니다.',
        { statusCode: 500 },
      );
    }
    return updatedDog;
  },
};

module.exports = weightService;
