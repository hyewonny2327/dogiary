const Diary = require("../models/diaryModel.js");

exports.diarySaveService = async ({ imageUrl, title, content }) => {
  try {
    const newDiary = new Diary({ imageUrl, title, content });

    console.log(newDiary);

    const result = await newDiary.save();
    return { success: true, result };
  } catch (err) {
    console.error("데이터베이스에 저장하는 도중 오류가 발생했습니다.", err);
  }
};

// create, save 둘다 몽고DB에 저장하는 메소드이지만
//어떤 차이가 있는가 ?

exports.diaryUpdateService = async (_id, imageUrl, title, content) => {
  try {
    if (!_id) {
      throw new Error(`권한이 없습니다.`);
    }
    const diary = await Diary.findById(_id);

    if (!diary) {
      throw new Error(`해당하는 일기가 없습니다`);
    }

    diary.imageUrl = imageUrl;
    diary.title = title;
    diary.content = content;

    const result = await diary.save();

    return { success: true, result };
  } catch (err) {
    console.error("다이어리 업데이트 중에 오류가 발생했습니다.", err);
  }
};

exports.diaryDeleteService = async (_id) => {
  try {
    if (!_id) {
      throw new Error(`권한이 없습니다.`);
    }
    const result = await Diary.deleteOne({ _id });

    if (result.deletedCount === 1) {
      return { success: true, result };
    } else {
      return { success: false, result };
    }
  } catch (err) {
    console.error("다이어리 삭제 중에 오류가 발생했습니다.", err);
  }
};

exports.diaryGetAllService = async () => {
  try {
    const result = await Diary.find({}, `_id createdAt imageUrl title content`);
    return { success: true, result };
  } catch (err) {
    console.error("다이어리 목록을 가져오는 중에 오류가 발생했습니다.", err);
  }
};
