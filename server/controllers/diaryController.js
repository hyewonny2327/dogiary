const commonErrors = require("../middlewares/commonErrors");
const errorHandler = require("../middlewares/errorHandler");
const {
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaries,
  getDailyDiaries,
  getMonthDiaries,
  getCurosrDiaries,
} = require("../services/diaryService");
const path = require("path");
const User = require("../models/userModel");

const successResponse = (data, message) => ({
  message,
  error: null,
  data,
});

// 이미지 업로드 공통 함수
const getImageUrl = async (req) => {
  try {
    const matchedUserImage = await User.findOne(
      { userId: req.currentUserId },
      { imageUrl: 1 }
    );
    if (req.file && req.file.filename !== undefined) {
      return path.join(__dirname, "../public/images", req.file.filename);
    } else {
      return matchedUserImage.imageUrl;
    }
  } catch (error) {
    throw new errorHandler("internalError", commonErrors.internalError, {
      statusCode: 500,
      cause: error,
    });
  }
};

exports.postDiary = async (req, res, next) => {
  try {
    const { title, content, date } = req.body;
    //이미지 업로드
    const imageUrl = await getImageUrl(req);

    if (!title || !content || !date) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
        cause: error,
      });
    }

    const result = await createDiary({
      imageUrl,
      title,
      content,
      userId: req.currentUserId,
      date,
    });

    res.status(200).json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

//일기 수정
exports.putDiary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, date } = req.body || {};

    if (!id) {
      throw new errorHandler(commonErrors.argumentError, "argumentError", {
        statusCode: 400,
      });
    }
    //이미지 업로드
    const imageUrl = await getImageUrl(req);

    if (!title || !content || !date) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }

    // req.currentUserId가 정의되어 있고 updateDiary에 전달되었는지 확인
    const result = await updateDiary(id, req.currentUserId, {
      imageUrl,
      title,
      content,
      date,
    });

    res.status(200).json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

//일기 삭제
exports.deleteDiary = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new errorHandler("argumentError", commonErrors.argumentError, {
        statusCode: 400,
      });
    }

    const result = await deleteDiary(id, req.currentUserId);

    if (!result || result.deletedCount !== 1) {
      throw new errorHandler("notfound", commonErrors.resourceNotFoundError, {
        statusCode: 404,
      });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//모두 조회 일간 조회
exports.getDiaries = async (req, res, next) => {
  try {
    const { createdAt } = req.query;
    if (createdAt && !/^\d{4}-\d{2}-\d{2}$/.test(createdAt)) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }
    const result = createdAt
      ? await getDailyDiaries(req.currentUserId, createdAt)
      : await getDiaries(req.currentUserId);

    const message = createdAt
      ? `${createdAt} 조회가 성공적으로 완료되었습니다.`
      : "전체 조회가 성공적으로 완료되었습니다.";
    res.status(200).json(successResponse(result, message));
  } catch (err) {
    next(err);
  }
};

// 월간 일기 조회
exports.getMonthDiaries = async (req, res, next) => {
  try {
    // 년도 및 월 가져오기
    const { year, month } = req.query;
    //year = 1000~9999 입력
    const validatedYear = parseInt(year, 10);
    //month = 1~12 만 입력
    const validatedMonth = parseInt(month, 10);

    if (
      isNaN(validatedYear) ||
      validatedYear < 1000 ||
      validatedYear > 9999 ||
      isNaN(validatedMonth) ||
      validatedMonth < 1 ||
      validatedMonth > 12
    ) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }

    const result = await getMonthDiaries(req.currentUserId, year, month);

    const message = `${validatedYear}년 ${validatedMonth}월의 월간 조회가 성공적으로 완료되었습니다.`;

    res.status(200).json(successResponse(result, message));
  } catch (err) {
    next(err);
  }
};

//커서 기반 페이징
exports.getCurosrDiaries = async (req, res, next) => {
  try {
    const { cursor } = req.query;
    const currentDate = new Date(cursor);

    if (isNaN(currentDate) || currentDate.toString() === "Invalid Date") {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }
    const pageSize = 10;

    const result = await getCurosrDiaries(
      req.currentUserId,
      currentDate,
      pageSize
    );

    const message = `${cursor}을 기준으로 다이어리 목록을 성공적으로 불러왔습니다.`;

    res.status(200).json(successResponse(result, message));
  } catch (err) {
    next(err);
  }
};
