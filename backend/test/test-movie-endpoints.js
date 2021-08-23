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

var movie_2 = {
  title: "Die hard",
  description:
    "NYPD cop John McClane's plan to reconcile with his wife is interrupted...",
  duration: "2h 12m",
  publishYear: "1998",
  price: 10.9,
  category: {
    _id: "60f7fed473c33425420f7135",
  },
  thumbnail:
    "https://occ-0-395-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP...",
  trailerURL: "https://www.youtube.com/watch?v=jaJuwKCmJbY",
  casts: "Bruce Willis, Alan Rickman, Bonnie Bedelia and more",
};

describe("Movie Testing", () => {
  beforeEach(async () => {
    // Before each test we empty the database
    await Movie.remove();
    await Category.remove();
  });

  describe("/GET movies", () => {
    it("Able to GET all movies (No data)", (done) => {
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
    it("Able to GET all movies (Has data)", async () => {
      // Create 1 movie
      var newMovie = {...movie};
      const categoryObj = await Category.create(category);
      newMovie.category._id = categoryObj.id;
      const movieObj = await Movie.create(newMovie);
      const res = await chai.request(server).get("/api/v1/movies/");
      res.should.have.status(200);
      res.body.data.movies.should.be.a("array");
      res.body.data.movies.length.should.be.eql(1);
      res.body.data.movies[0].category.name.should.be.eql("Dramas");
      res.body.data.movies[0].movies[0].title.should.be.eql("Gotham");
    });
  });

  describe("/POST movies", () => {
    it("Able to create a movie with all requires fields", (done) => {
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
    it("Unable to create a movie when missing the Price field", (done) => {
      // Delete price field
      var newMovie = { ...movie };
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

  describe("/GET all movie by category", () => {
    it("Able to fetch all movies of Drama Category", async () => {
      // Create few drama movie
      const categoryObj = await Category.create(category);
      var newMovie_1 = { ...movie };
      newMovie_1.category._id = categoryObj.id;
      const movieObj_1 = await Movie.create(newMovie_1);
      var newMovie_2 = { ...movie_2 };
      newMovie_2.category._id = categoryObj.id;
      const movieObj_2 = await Movie.create(newMovie_2);

      const res = await chai
        .request(server)
        .get(`/api/v1/movies/category?name=Dramas`);
      res.should.have.status(200);
      res.body.data.movies.should.be.a("array");
      res.body.data.movies.length.should.be.eql(2);
      res.body.data.movies[0].title.should.be.eql("Gotham");
      res.body.data.movies[1].title.should.be.eql("Die hard");
    });
  });

  describe("/GET all movie by ID", () => {
    it("Able to fetch a movie by given ID", async () => {
      // Create few drama movies
      const categoryObj = await Category.create(category);
      var newMovie_1 = { ...movie };
      newMovie_1.category._id = categoryObj.id;
      const movieObj_1 = await Movie.create(newMovie_1);

      const res = await chai
        .request(server)
        .get(`/api/v1/movies/${movieObj_1._id}`);
      res.should.have.status(200);
      res.body.data.movie.title.should.be.eql("Gotham");
    });
  });
});
