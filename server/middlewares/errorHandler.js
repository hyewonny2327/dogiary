// 커스텀 가능한 에러
/**
 * 기존 에러 클래스를 확장한 AppError 클래스
 * 기존 에러 클래스 대비 name과 httpCode를 추가로 저장하여 express의 중앙 에러 핸들러가 에러 처리를 보다 쉽게 할 수 있도록 도와준다.
 * 참고: https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md#code-example--doing-it-even-better
 */
class errorHandler extends Error {
  constructor(name, description, options) {
    if (options?.cause !== undefined && options?.cause !== null) {
      super(description, { cause: options.cause });
    } else {
      super(description);
    }
    this.name = name;
    this.statusCode = options?.statusCode ?? 500;
    Error.captureStackTrace(this);
  }
}

module.exports = errorHandler;

// 예시
// new AppError("Not Found Error", "해당 여행 정보가 존재하지 않습니다", {
//   statusCode: 404,
// });

// app.use((err,req,res,next) => {
//   res.status(500).json({statusCode: res.statusCode, errMessage:err.message}); //상태코드 500, 에러 메세지 전달
//   })
