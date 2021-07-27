//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("..");
let should = chai.should();
chai.use(chaiHttp);
const Movie = require("../src/models/movie");
const Category = require("../src/models/category");

var category = {
  name: "Dramas",
};
var movie = {
  title: "Gotham",
  description:
    "Long before he was commissioner, rookie cop James Gordon takes on Gotham City crime and corruption to avenge the murder of Bruce Wayne's parents.",
  duration: "5 seasons",
  publishYear: "2019",
  price: 18.99,
  thumbnail:
    "https://occ-0-395-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABe4dJ_YqYuo413Lc5SEgnaePcQsT0Mpc7tC3LrV5SO-Kr_AIvSBrQQW6d5ARfa-jC-_yExqzthXKrDHFZpQ1T572KNY.webp",
  category: {
    _id: "60f7fed473c33425420f7135",
  },
  trailerURL: "https://www.youtube.com/watch?v=mUe79BSig_4",
  images: [],
  casts:
    "Ben McKenzie, Donal Logue, Jada Pinkett Smith, David Mazouz, Sean Pertwee, Camren Bicondova",
};

describe("Movie Testing", () => {
  beforeEach(async () => {
    // Before each test we empty the database
    await Movie.remove();
    await Category.remove();
  });

  describe("/GET movies", () => {
    it("it should GET all movies (No data)", (done) => {
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

  describe("/GET movies", () => {
    it("it should GET all movies (Has data)", async () => {
      // Create 1 movie
      var newMovie = movie;
      const categoryObj = await Category.create(category);
      newMovie.category._id = categoryObj.id;
      const movieObj = await Movie.create(newMovie);
      chai
        .request(server)
        .get("/api/v1/movies/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.movies.should.be.a("array");
          res.body.data.movies.length.should.be.eql(0);
        });
    });
  });

  describe("/POST movies", () => {
    it("it should POST a movie with all requires fields", (done) => {
      chai
        .request(server)
        .post("/api/v1/movies/")
        .send(movie)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.data.movie.should.have.property("title").eql("Gotham");
          done();
        });
    });
  });

  describe("/POST movies", () => {
    it("it should not POST a movie when missing the Price field", (done) => {
      // Delete price field
      var newMovie = movie;
      delete newMovie["price"];

      chai
        .request(server)
        .post("/api/v1/movies/")
        .send(newMovie)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
