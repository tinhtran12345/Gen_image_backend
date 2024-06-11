import request from "supertest";
import app from "../src/main";

describe("app", () => {
    it("responds with a not found message", (done) => {
        request(app)
            .get("/what-is-this-even")
            .set("Accept", "application/json")
            .expect(404, done);
    });
});

describe("GET /", () => {
    it("responds with a json message", (done) => {
        request(app)
            .get("/health")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(
                200,
                {
                    message: "Server is running...",
                },
                done
            );
    });
});
