import app from "../app";
import models, { sequelizeDAO } from "../db";
import request from "supertest";

beforeAll(async () => {
  await sequelizeDAO.sync();
});

describe("통합:: GET /", () => {
  test("벤더 리스트 ", (done) => {
    request(app)
      .get("/")
      .send()
      .expect("Content-Type", /json/)
      .expect(200, done);

    done();
  });
});
