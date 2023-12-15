const {
  diarySaveService,
  diaryUpdateService,
  diaryDeleteService,
  diaryGetAllService,
} = require("../services/diaryService");
// ======

exports.diarySave = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 요청 본문이 없습니다." });
    }

    const { imageUrl, title, content } = req.body || {};

    if (!imageUrl) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 'imageUrl'이 없습니다." });
    }

    if (!title) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 'title'이 없습니다." });
    }

    if (!content) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 'content'가 없습니다." });
    }

    const { success, result } = await diarySaveService({
      imageUrl,
      title,
      content,
    });

    if (success) {
      return res.status(201).json(result);
    } else {
      return res
        .status(400)
        .json({ error: "다이어리를 저장하는데 실패했습니다." });
    }
  } catch (err) {
    console.error("에러", err);
    return res.status(500).json({ error: "내부 서버 오류입니다." });
  }
};

exports.diaryUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, content } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: "다이어리 ID가 필요합니다." });
    }

    if (!imageUrl || !title || !content) {
      return res
        .status(400)
        .json({ error: "잘못된 요청입니다. 필수 필드가 누락되었습니다." });
    }

    const { success, result } = await diaryUpdateService(
      id,
      imageUrl,
      title,
      content
    );

    if (success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "다이어리를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error("에러", err);
    res
      .status(500)
      .json({ error: "다이어리 업데이트 중에 오류가 발생했습니다." });
  }
};

//
exports.diaryDelete = async (req, res) => {
  console.log(req.id);

  try {
    const { id } = req.params;
    // 다이어리 삭제 서비스 호출
    const { success, result } = await diaryDeleteService(id);

    if (success) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({ error: "해당 일기가 존재하지 않습니다." });
    }
  } catch (err) {
    console.error("에러", err);
    res.status(500).json({ error: "일기 삭제 중에 오류가 발생했습니다." });
  }
};

exports.diaryGetAll = async (req, res) => {
  try {
    const { success, result } = await diaryGetAllService();

    if (success) {
      res.status(200).json({
        success: true,
        message: "일기 목록을 가져왔습니다.",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "일기 목록을 가져오는 데 실패했습니다.",
      });
    }
  } catch (err) {
    console.error("에러", err);
    res.status(500).json({
      success: false,
      message: "일기 목록을 가져오는 중에 오류가 발생했습니다.",
    });
  }
};
