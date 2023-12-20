const commonErrors = require("../middlewares/commonError");
const errorHandler = require("../middlewares/errorHandler");
const {
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaries,
  getDailyDiaries,
} = require("../services/diaryService");

exports.postDiary = async (req, res, next) => {
  try {
    const { imageUrl, title, content } = req.body;

    if (!imageUrl || !title || !content) {
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
    });

    res
      .status(200)
      .json({ message: "다이어리가 DB에 저장되었습니다.", data: result });
  } catch (err) {
    next(err);
  }
};

//일기 수정
exports.putDiary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, content } = req.body || {};

    if (!id) {
      throw new errorHandler(commonErrors.argumentError, "argumentError", {
        statusCode: 400,
      });
    }

    if (!imageUrl || !title || !content) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }

    // req.currentUserId가 정의되어 있고 updateDiary에 전달되었는지 확인
    const result = await updateDiary(id, req.currentUserId, {
      imageUrl,
      title,
      content,
    });

    res
      .status(200)
      .json({ message: "일기 업데이트가 완료 되었습니다.", result });
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

//모두 조회 월간 조회 일간 조회 (현재 월간 조회 보류)
exports.getDiaries = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new errorHandler("inputError", commonErrors.inputError, {
        statusCode: 400,
      });
    }
    const result = date
      ? await getDailyDiaries(req.currentUserId, date)
      : await getDiaries(req.currentUserId);
    const message = date
      ? `${date}일기를 성공적으로 가져왔습니다`
      : "모든 일기 목록을 가져왔습니다.";
    res.status(200).json({
      message:
        result && result.length > 0
          ? message
          : "저장되어 있는 일기가 없습니다.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
