const Dog = require('../models/dogModel.js');
const errorHandler = require('../middlewares/errorHandler.js');

const commonErrors = require('../middlewares/commonErrors.js');
const dogService = {
  async createDog(dogData, currentUserId) {
    dogData.userId = currentUserId;
    const dog = await Dog.create(dogData);
    const dogObject = dog.toObject();
    return dogObject;
  },

  // 강아지 수정
  async updatedDogProfile(id, dogData, currentUserId) {
    const { imageUrl, name, type, gender, date, birthday } = dogData;
    const dog = await Dog.findById(id).lean();

    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 401 },
      );
    }
    if (!dog) {
      throw new errorHandler('Not Found', '해당 강아지가 존재하지 않습니다.', {
        statusCode: 404,
      });
    }
    const result = await Dog.updateOne(
      { _id: id }, // 검색 조건
      {
        userId: currentUserId,
        imageUrl: imageUrl,
        name: name,
        type: type,
        sex: gender,
        date: date,
        birthday: birthday,
      },
    );
    if (result.modifiedCount !== 1) {
      // 업데이트된 문서의 수가 1이 아닌 경우 처리
      // throw new Error("강아지 프로필 업데이트에 실패했습니다.");
      throw new errorHandler(
        commonErrors.configError,
        '서버시스템에 문제로 인해 업데이트에 실패하였습니다..',
        { statusCode: 500 },
      );
    }
    return result;
  },

  // 강아지 삭제
  async deletedDog(id, currentUserId) {
    const dog = await Dog.findById(id);

    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 401 },
      );
    }

    if (!dog) {
      // throw new Error("해당 강아지가 존재하지 않습니다.");
      throw new errorHandler('Not Found', '해당 강아지가 존재하지 않습니다.', {
        statusCode: 404,
      });
    }

    const deletedDog = await Dog.findByIdAndDelete(id);
    return deletedDog;
  },

  // 강아지 조회
  async getOneDog(id, currentUserId) {
    const dog = await Dog.findById(id).lean();
    if (!dog || dog.length === 0) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        '해당 강아지를 찾을수없습니다.',
        { statusCode: 404 },
      );
    }
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        '해당 사용자에게 권한이 없습니다.',
        { statusCode: 401 },
      );
    }
    return dog;
  },
};

module.exports = dogService;
