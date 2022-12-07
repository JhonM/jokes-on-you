import jokesController from "../../controllers/jokes-controller";

describe("Hello Controller Test Suite", () => {
  it("Should return hello message", () => {
    const mockMessage = "hello, World!";
    const message = jokesController();

    expect(message).toBe(mockMessage);
  });
});
