//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("..");
let should = chai.should();
chai.use(chaiHttp);
const User = require("../src/models/user");

describe("User Endpoint Testing", () => {
  beforeEach(async () => {
    // Before each test we empty the database
    await User.remove();
  });

  describe("Test login", () => {    
    it("Able to login with correct username/password", async () => {
      // Create a user firstly
      var res = await chai.request(server).post(`/api/v1/auth/register`).send({
        username: "nghiatran",
        email: "nghia@gmail.com",
        password: "A123456789"
      });

      // Login with this user
      res = await chai.request(server).post(`/api/v1/auth/login`).send({
        email: "nghia@gmail.com",
        password: "A123456789"
      });
      res.should.have.status(200);
    });

    it("Unable to login with incorrect username/password", async () => {
      // Create a user firstly
      const user = {
        username: "nghiatran",
        email: "nghia@gmail.com",
        password: "A123456789"
      }
      const userObject = await User.create(user);

      // Login with this user
      const res = await chai.request(server).post(`/api/v1/auth/login`).send({
        email: "nghia@gmail.com",
        password: "111111111"
      });
      res.should.have.status(401);
    });
  });

  describe("Test register endpoint", () => {
    it("Able to register new user with valid email/password", async () => {
      // Login with this user
      const res = await chai.request(server).post(`/api/v1/auth/register`).send({
        username: "nghiatran",
        email: "nghia@gmail.com",
        password: "A123456789"
      });
      res.should.have.status(201);
      res.body.username.should.be.eql("nghiatran");
      res.body.email.should.be.eql("nghia@gmail.com");
      res.body.accessToken.should.exist;
    });

    it("Unable to register new user with invalid email/password", async () => {
      // Login with this user
      const res = await chai.request(server).post(`/api/v1/auth/register`).send({
        username: "nghiatran",
        email: "AAaAAAAAAA",
        password: "bb"
      });
      res.should.have.status(400);
    });
  });
});
