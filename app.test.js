const app = require("../app");
const request = require("supertest");

describe("My Airport server", () => {
    test("can GET all the airports", (done) => {
        request(app)
            .get("/airports")
            .expect(200)
            .expect((response) => {
                expect(response.body.length).toBeEqualTo(28000);
            })
            .end(done);
    });
});