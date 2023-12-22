const Diary = require("../models/diaryModel.js");

//일기 생성
exports.createDiary = async ({ imageUrl, title, content, userId, date }) => {
  const newDiary = new Diary({ imageUrl, title, content, userId, date });
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
    `_id createdAt imageUrl title content date`
  );
  return result;
};

//일간 일기 조회

exports.getDailyDiaries = async (userId, date) => {
  // 날짜 객체 생성
  const startDate = new Date(date);
  // 2023-12-16T00:00:00.000Z
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  // 2023-12-17T00:00:00.000Z

  // setDate : 객체의 날짜를 설정
  // getDate : 객체에서 해당 월의 날짜를 검색

  // MongoDB에서 데이터 조회
  const result = await Diary.find(
    {
      // 범위설정 시간 00~ 23시 59분 59초
      userId,
      createdAt: { $gte: startDate, $lt: endDate },
    },
    `_id createdAt imageUrl title content date`
  );

  return result;
};

// 월간 조회

exports.getMonthDiaries = async (userId, year, month) => {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  const result = await Diary.find({
    userId,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
  })
    //내림차순
    .sort({ createdAt: -1 })
    .select("_id createdAt imageUrl title content date")
    .exec();

  return result;
};

//커서 기반 페이징
exports.getCurosrDiaries = async (userId, cursor, pageSize) => {
  const currentDate = new Date(cursor);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const isEndOfMonth = currentDate.getTime() === endOfMonth.getTime();

  // 커서가 해당 월의 마지막에 있다면, 다음 월의 1일을 나타낸다
  // 그렇지 않으면 endOfMonth가 사용됩니다.
  const nextMonthCursor = isEndOfMonth
    ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    : endOfMonth;

  const query = {
    userId,
    createdAt: { $gte: startOfMonth, $lt: nextMonthCursor },
  };

  const result = await Diary.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .select("_id createdAt imageUrl title content date")
    .exec();

  return result;
};
