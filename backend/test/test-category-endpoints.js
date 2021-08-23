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

describe("Category Testing", () => {
  beforeEach(async () => {
    // Before each test we empty the database
    await Category.remove();
  });

  describe("/GET categories", () => {
    it("Able to get all categories", async () => {
      // Create sample categories
      const categoryObj_1 = await Category.create({
        name: "Dramas",
      });
      const categoryObj_2 = await Category.create({
        name: "Action",
      });
      const categoryObj_3 = await Category.create({
        name: "Horror",
      });

      const res = await chai
        .request(server)
        .get(`/api/v1/categories`);
      res.should.have.status(200);
      res.body.data.categories.length.should.be.eql(3);
      res.body.data.categories[0].name.should.be.eql("Dramas");
      res.body.data.categories[1].name.should.be.eql("Action");
      res.body.data.categories[2].name.should.be.eql("Horror");
    });
  });
});
