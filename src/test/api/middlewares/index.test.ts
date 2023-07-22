import { isLoggedIn, isNotLoggedIn } from "../../../api/middlewares";
import indexRouter from "../../../api/routes";

// isLoggedIn

// isNotLoggedIn

// 기본형식
describe("테스트 단위", () => {
  beforeAll(() => {});
  afterAll(() => {});
  test("[GET] / ", (done) => {
    done();
  });
});

// 실예
afterAll(async () => {
  await new Promise<void>((res, rej) => {
    setTimeout(() => res(), 500);
  });
});

describe("로그인 상태 확인", () => {
  describe("로그인 체크 ", () => {
    test("로그인 체크 : 코드 ", (done) => {
      done();
    });
  });
});
