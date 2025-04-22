const expect = require("chai").expect;
const request = require("request");

describe("SIT725 Backend API Tests", function () {
  this.timeout(5000); // 5 seconds timeout for all tests

  const baseUrl = "http://localhost:3001"; 

  // Test 1 - GET /api/projects
  it("GET /api/projects should return 200 and include a data array", function (done) {
    request.get(`${baseUrl}/api/projects`, function (error, response, body) {
      if (error) return done(error);

      console.log("Status Code:", response.statusCode);
      console.log("Response Body:", body);

      expect(response.statusCode).to.equal(200);

      let resData;
      try {
        resData = JSON.parse(body);
      } catch (e) {
        return done(new Error("Response was not valid JSON"));
      }

      expect(resData).to.be.an("object");
      expect(resData).to.have.property("data").that.is.an("array");
      done();
    });
  });

  // Test 2 - POST /api/users with valid data
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
      if (error) return done(error);

      console.log("Status:", response.statusCode);
      console.log("Returned Body:", body);

      expect([200, 201]).to.include(response.statusCode);
      expect(body).to.have.property("message").that.includes("saved");
      done();
    });
  });

  // Test 3 - GET /api/users
  it("GET /api/users should return 200 and an array", function (done) {
    request.get(`${baseUrl}/api/users`, function (error, response, body) {
      if (error) return done(error);

      console.log("Status Code:", response.statusCode);
      console.log("User List Body:", body);

      expect(response.statusCode).to.equal(200);
      const users = JSON.parse(body);
      expect(users).to.be.an("array");
      done();
    });
  });

  // Test 4 - POST /api/users with missing data
  it("POST /api/users with invalid data should return 400", function (done) {
    const invalidUser = {
      firstName: "",
      lastName: "",
      email: ""
    };

    request.post({
      url: `${baseUrl}/api/users`,
      json: true,
      body: invalidUser
    }, function (error, response, body) {
      if (error) return done(error);

      console.log("Status:", response.statusCode);
      console.log("Invalid Submission Body:", body);

      expect(response.statusCode).to.equal(400);
      expect(body).to.have.property("message").that.includes("Invalid");
      done();
    });
  });
});
