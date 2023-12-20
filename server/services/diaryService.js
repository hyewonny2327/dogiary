const errorHandler = require("../middlewares/errorHandler.js");
const Diary = require("../models/diaryModel.js");

//일기 생성
exports.createDiary = async ({ imageUrl, title, content, userId }) => {
  const newDiary = new Diary({ imageUrl, title, content, userId });
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
    `_id createdAt imageUrl title content `
  );
  return result;
};

//월간 일기 조회(보류)
// exports.getMonthlyDiaries = async (month) => {
//   try {
//     const startDate = new Date(`2023-${month}-01`);

//     const endDate = new Date(startDate);
//     endDate.setMonth(startDate.getMonth() + 1);

//     const result = await Diary.find(
//       {
//         //초과(gt), 미만(lt), 이상(gte), 이하(lte)
//         //startDate  지정된 달의 1일부터 endDate 다음달 1일(포함되지 않음) 까지
//         // createdAt: { $gte: startDate, $lt: endDate }, 표현은 필드에 대한 범위를 지정하는 MonggoDB쿼리 필터
//         // 해당 범위는 startDate 결과값 2023-12-01 00:00:00 ~ 2023-12-31 23:59:59

//         createdAt: { $gte: startDate, $lt: endDate },
//       },
//       `_id createdAt imageUrl title content`
//     );

//     return result;
//   } catch (err) {
//     console.error("월간 일기 조회 중 오류 발생", err);
//   }
// };

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
    `_id createdAt imageUrl title content`
  );

  return result;
};
