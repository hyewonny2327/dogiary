const Diary = require('../models/diaryModel.js');

//일기 생성
exports.createDiary = async ({ imageUrls, title, content, userId, date }) => {
  const newDiary = new Diary({ imageUrls, title, content, userId, date });
  const result = await newDiary.save();
  return result;
};

//일기 수정
exports.updateDiary = async (_id, userId, updates) => {
  const diary = await Diary.findById(_id);

  if (!diary) {
    throw new Error(`해당 일기를 찾을 수 없습니다.`);
  }

  //사용자가 해당 일기의 소유자인지 확인
  if (diary.userId !== userId) {
    throw new Error(`권한이 거부되었습니다. 해당 일기의 소유자가 아닙니다.`);
  }

  // 업데이트 적용
  Object.assign(diary, updates);

  const result = await diary.save();

  return result;
};

//일기 삭제
exports.deleteDiary = async (_id, userId) => {
  const diary = await Diary.findById(_id);
  if (!diary) {
    throw new Error(`해당일기가 없습니다`);
  }
  if (diary.userId !== userId) {
    throw new Error(`권한이 거부되었습니다. 해당 일기의 소유자가 아닙니다.`);
  }

  const result = await Diary.deleteOne({ _id });
  if (result.deletedCount === 1) {
    return result;
  }
};

//모든 일기 조회
exports.getDiaries = async (userId) => {
  const result = await Diary.find(
    { userId },
    `_id createdAt imageUrls title content date userId`
  );
  return result;
};

//일간 일기 조회

exports.getDailyDiaries = async (userId, date) => {
  const result = await Diary.find(
    {
      userId,
      date: date,
    },
    `_id createdAt imageUrls title content date userId`
  );

  return result;
};
// 월간 조회

exports.getMonthDiaries = async (userId, year, month) => {
  const startOfMonth = `${year}-${month.toString().padStart(2, "0")}-01`;
  const endOfMonth = new Date(year, month, 1);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0); // 이로써 원래 월의 마지막 날이 됩니다.

  const result = await Diary.find({
    userId,
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  })
    .sort({ date: -1 })
    .select("_id createdAt imageUrls title content date userId")
    .exec();

  return result;
};

//커서 기반 페이징
exports.getCursorDiaries = async (userId, cursor) => {
  const query = {
    userId: userId,
  };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const result = await Diary.find(query)
    .sort({ date: -1 })
    .limit(10)
    .select("_id createdAt imageUrls title content date userId")
    .exec();

  return result;
};
