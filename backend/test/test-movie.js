//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("..");
let should = chai.should();
chai.use(chaiHttp);
const Movie = require("../src/models/movie");

describe("Movie Testing", () => {
  beforeEach((done) => {
    // Before each test we empty the database
    Movie.remove({}, (err) => {
      done();
    });
  });

  describe("/GET movies", () => {
    it("it should GET all movies", (done) => {
      chai
        .request(server)
        .get("/api/v1/movies/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.movies.should.be.a("array");
          res.body.data.movies.length.should.be.eql(0);
          done();
        });
    });
  });
});
