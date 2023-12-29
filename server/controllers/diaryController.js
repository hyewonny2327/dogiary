const commonErrors = require('../middlewares/commonErrors');
const errorHandler = require('../middlewares/errorHandler');
const {
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaries,
  getDailyDiaries,
  getMonthDiaries,
  getCursorDiaries,
} = require('../services/diaryService');
const path = require('path');
const User = require('../models/userModel');

const successResponse = (data, message) => ({
  message,
  error: null,
  data,
});

// 이미지 업로드 공통 함수
const getImageUrls = async (req) => {
  try {
    if (req.files && req.files?.length > 0) {
      return req.files.map((file) =>
        path.join(__dirname, '../public/images', req.file.filename),
      );
    } else {
      const matchedUserImage = await User.findOne(
        { userId: req.currentUserId },
        { imageUrl: 1 },
      );

      return matchedUserImage?.imageUrl;
    }
  } catch (error) {
    throw new errorHandler(commonErrors.internalError, 'internalError', {
      statusCode: 500,
      cause: error,
    });
  }
};

exports.postDiary = async (req, res, next) => {
  try {
    const { title, content, date } = req.body ? req.body : {};

    //이미지 업로드
    const imageUrls = await getImageUrls(req);

    //유효성검사
    if (!title || !content || !date) {
      throw new errorHandler('inputError', commonErrors.inputError, {
        statusCode: 400,
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new errorHandler('inputError', '유효하지 않은 날짜 형식', {
        statusCode: 400,
      });
    }

    const [year, month, day] = date.split('-').map(Number);
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    if (!(day >= 1 && day <= lastDayOfMonth)) {
      throw new errorHandler(
        'inputError',
        '지정된 월에 대한 유효하지 않은 날짜',
        {
          statusCode: 400,
        },
      );
    }

    const result = await createDiary({
      imageUrls: imageUrls,
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
    const { title, content } = req.body ? req.body : {};

    if (!id) {
      throw new errorHandler(commonErrors.argumentError, 'argumentError', {
        statusCode: 400,
      });
    }
    //이미지 업로드
    const imageUrls = await getImageUrls(req);

    if (!title || !content) {
      throw new errorHandler('inputError', commonErrors.inputError, {
        statusCode: 400,
      });
    }

    // req.currentUserId가 정의되어 있고 updateDiary에 전달되었는지 확인
    const result = await updateDiary(id, req.currentUserId, {
      imageUrls: imageUrls,
      title,
      content,
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
      throw new errorHandler('argumentError', commonErrors.argumentError, {
        statusCode: 400,
      });
    }

    const result = await deleteDiary(id, req.currentUserId);

    if (!result || result.deletedCount !== 1) {
      throw new errorHandler('notfound', commonErrors.resourceNotFoundError, {
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
    const { date } = req.query;

    // 날짜 형식 유효성 검사
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new errorHandler('inputError', commonErrors.inputError, {
        statusCode: 400,
      });
    }

    let result;

    // 날짜가 제공된 경우 확인
    if (date) {
      result = await getDailyDiaries(req.currentUserId, date);
    } else {
      result = await getDiaries(req.currentUserId);
    }

    // 결과가 비어 있는지 확인
    if (!result || result.length === 0) {
      const message = date
        ? `${date}에 대한 데이터가 없습니다.`
        : '사용 가능한 데이터가 없습니다.';
      res.status(404).json(successResponse(null, message));
    } else {
      const message = date
        ? `${date} 쿼리가 성공적으로 완료되었습니다.`
        : '전체 쿼리가 성공적으로 완료되었습니다.';
      res.status(200).json(successResponse(result, message));
    }
  } catch (err) {
    next(err);
  }
};

// 월간 일기 조회
exports.getMonthDiaries = async (req, res, next) => {
  try {
    // 년도 및 월 가져오기
    const { date } = req.query;

    const dateFormatRegex = /^\d{4}-\d{2}$/;
    if (!dateFormatRegex.test(date)) {
      throw new errorHandler('inputError', commonErrors.inputError, {
        statusCode: 400,
      });
    }

    const copyDate = new Date(date);
    const year = copyDate.getFullYear();
    const month = copyDate.getMonth() + 1;

    // toLocaleDateString()
    const result = await getMonthDiaries(req.currentUserId, year, month);

    const message =
      result.length === 0
        ? `${year}년 ${month}월에 대한 데이터가 없습니다.`
        : `${year}년 ${month}월 조회가 성공적으로 완료되었습니다.`;

    res.status(200).json(successResponse(result, message));
  } catch (err) {
    next(err);
  }
};

//커서 기반 페이징
exports.getCursorDiaries = async (req, res, next) => {
  try {
    const { cursor } = req.query;

    const result = await getCursorDiaries(req.currentUserId, cursor);

    const message = `${cursor}을 기준으로 다이어리 목록을 성공적으로 불러왔습니다.`;

    res.status(200).json(successResponse(result, message));
  } catch (err) {
    next(err);
  }
};
