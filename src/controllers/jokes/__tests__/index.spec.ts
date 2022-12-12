import request from "supertest";
import app from "../../../app";

describe("Jokes API endpoints Test Suite", () => {
  it("Random joke endpoint should return 200", (done) => {
    request(app)
      .get("/api/random-joke")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });

  it("Random jokes endpoint should return 200", (done) => {
    request(app)
      .get("/api/random-jokes")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });

  it("Favourites endpoint should return 200", (done) => {
    request(app)
      .get("/api/favourites")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
});
