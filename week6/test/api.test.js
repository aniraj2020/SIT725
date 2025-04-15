const expect = require("chai").expect;
const request = require("request");

describe("SIT725 Backend API Tests", function () {
  const baseUrl = "http://localhost:3003";

  it("GET /api/projects should return 200 and include a data array", function (done) {
    request.get(`${baseUrl}/api/projects`, function (error, response, body) {
      console.log("Status Code:", response.statusCode);
      console.log("Response Body:", body);

      expect(response.statusCode).to.equal(200);

      let resData;
      try {
        resData = JSON.parse(body); //safely parse if needed
      } catch (e) {
        return done(new Error("Response was not valid JSON"));
      }

      expect(resData).to.be.an("object");
      expect(resData).to.have.property("data").that.is.an("array");
      done();
    });
  });

  it("POST /api/users should return success message", function (done) {
    const testUser = {
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@mail.com`
    };

    request.post({
      url: `${baseUrl}/api/users`,
      json: true,
      body: testUser
    }, function (error, response, body) {
      console.log("Status:", response.statusCode);
      console.log("Returned Body:", body);

      expect([200, 201]).to.include(response.statusCode);
      expect(body).to.have.property("message").that.includes("saved");
      done();
    });
  });
});
