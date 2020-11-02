let expect = require("chai").expect;
let request = require("request");

// Fetch test of dashboard api endpoint

describe("fetch request tests", () => {
  it("correct fetch response", (done) => {
    request("http://localhost:3001/api/dashboard", (error, response, body) => {
      expect(body).to.equal('["redirect to login"]');
      done();
    });
  });
});
