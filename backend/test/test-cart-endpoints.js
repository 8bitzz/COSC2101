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
const Cart = require("../src/models/cart");
const User = require("../src/models/user");

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

var accessToken = "";

describe("Cart Endpoint Testing", () => {
  beforeEach(async () => {
    // Before each test we empty the database
    await Movie.remove();
    await Category.remove();
    await Cart.remove();
    await User.remove();

    // Create a user firstly
    var res = await chai.request(server).post(`/api/v1/auth/register`).send({
      username: "nghiatran",
      email: "nghia@gmail.com",
      password: "A123456789",
    });

    // Store the access token
    accessToken = res.body.accessToken;
  });

  describe("Test get empty cart", () => {
    it("Able to get an empty cart of current user", async () => {
      const res = await chai
        .request(server)
        .get(`/api/v1/carts`)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
      res.body.data.carts.length.should.be.eql(0);
    });

    it("Able to get all cart items for current user", async () => {
      // Create a cart firstly
      const categoryObj = await Category.create(category);
      var newMovie_1 = { ...movie };
      newMovie_1.category._id = categoryObj.id;
      const movieObj_1 = await Movie.create(newMovie_1);
      var res = await chai
        .request(server)
        .post(`/api/v1/carts?movie_id=${movieObj_1._id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      // Fetch current cart, and verify there is one item
      res = await chai
        .request(server)
        .get(`/api/v1/carts`)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
      res.body.data.carts.length.should.be.eql(1);
      res.body.data.carts[0].movie.title.should.be.eql("Gotham");
    });
  });

  describe("Test Create a new cart", () => {
    it("Able to creata new cart for a current user", async () => {
      // Create few drama movie
      const categoryObj = await Category.create(category);
      var newMovie_1 = { ...movie };
      newMovie_1.category._id = categoryObj.id;
      const movieObj_1 = await Movie.create(newMovie_1);

      const res = await chai
        .request(server)
        .post(`/api/v1/carts?movie_id=${movieObj_1._id}`)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(201);
    });
  });

  describe("Test Delete a cart", () => {
    it("Able to delete a cart for a current user", async () => {
      // Create a cart firstly
      const categoryObj = await Category.create(category);
      var newMovie_1 = { ...movie };
      newMovie_1.category._id = categoryObj.id;
      const movieObj_1 = await Movie.create(newMovie_1);
      var res = await chai
        .request(server)
        .post(`/api/v1/carts?movie_id=${movieObj_1._id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      // Delete a cart and get empty cart
      res = await chai
        .request(server)
        .delete(`/api/v1/carts?movie_id=${movieObj_1._id}`)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);

      // Verify the cart number is 0
      res = await chai
        .request(server)
        .get(`/api/v1/carts`)
        .set("Authorization", `Bearer ${accessToken}`);
      res.should.have.status(200);
      res.body.data.carts.length.should.be.eql(0);
    });
  });
});
