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
    `_id createdAt imageUrls title content date userId`,
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
    `_id createdAt imageUrls title content date userId`,
  );

  return result;
};
// 월간 조회 (월간 조회시 범위는 지정했으나 start만 가져오고 last는 못가져오는 현상 발생하여 11월 검색시 11월 이후 모든 데이터를 지속적으로 가져왔고 => 이후에 type of 확인시 start 는 string last는 object로 전부 string으로 전환하여 범위를 검색하여 정상 기능 작동)

exports.getMonthDiaries = async (userId, year, month) => {
  const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endOfMonth = new Date(year, month, 1);
  endOfMonth.setMonth(endOfMonth.getMonth());
  endOfMonth.setDate(endOfMonth.getDate() - 1);

  const endMonth = endOfMonth.toISOString();
  //toISOStirng 잃어버린 9시간...

  const result = await Diary.find({
    userId,
    date: {
      $gt: startOfMonth,
      $lte: endMonth,
    },
  })
    .sort({ date: -1 })
    .select('_id createdAt imageUrls title content date userId')
    .exec();

  return result;
};

//커서 기반 페이징
exports.getCursorDiaries = async (userId, cursor) => {
  const query = { userId: userId };

  if (cursor) {
    query._id = { $gt: cursor };
  }

  const result = await Diary.find(query)
    .sort({ date: -1 })
    .limit(10)
    .select('_id createdAt imageUrls title content date userId')
    .exec();

  if (!cursor) {
    const recent = await Diary.find({ userId: userId })
      .sort({ date: -1 })
      .limit(10)
      .select('_id createdAt imageUrls title content date userId')
      .exec();

    return recent;
  }

  return result;
};
