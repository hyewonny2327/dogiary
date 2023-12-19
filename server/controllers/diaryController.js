const {
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaries,
  getDailyDiaries,
} = require("../services/diaryService");

exports.postDiary = async (req, res) => {
  try {
    const { imageUrl, title, content } = req.body;

    if (!imageUrl || !title || !content) {
      return res
        .status(400)
        .json({ error: "잘못된 요청. 필수 필드가 누락되었습니다." });
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
    console.error("에러", err);
    res.status(500).json({ error: "내부 서버 오류." });
  }
};

//일기 수정
exports.putDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, content } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: "일기 ID가 필요합니다." });
    }

    if (!imageUrl || !title || !content) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 필수 필드가 누락되었습니다." });
    }
    // req.currentUserId가 정의되어 있고 updateDiary에 전달되었는지 확인
    const result = await updateDiary(id, req.currentUserId, {
      imageUrl,
      title,
      content,
    });

    res
      .status(200)
      .json({ message: "일기 업데이트가 완료되었습니다.", result });
  } catch (err) {
    console.error("에러", err);
    res.status(500).json({ error: "일기 업데이트 중 오류가 발생했습니다." });
  }
};

//일기 삭제
exports.deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteDiary(id, req.currentUserId);

    res.status(204).json({
      message: "일기 삭제가 완료되었습니다.",
      data: result,
    });
  } catch (err) {
    console.error("에러", err);
    res.status(500).json({ error: "일기 삭제 중에 오류가 발생했습니다." });
  }
};

//모두 조회 월간 조회 일간 조회 (현재 월간 조회 보류)
exports.getDiaries = async (req, res) => {
  try {
    const { date } = req.query;
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        error: "올바른 날짜 형식을 사용하세요 ('YYYY-MM-DD').",
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
          : "일치하는 일기를 찾을 수 없습니다.",
      data: result,
    });
  } catch (err) {
    console.error("에러 발생", err);
    res.status(500).json({
      message: "요청을 처리하는 동안 오류가 발생했습니다.",
      error: err.message,
    });
  }
};
