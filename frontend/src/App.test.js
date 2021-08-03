import { render, screen } from '@testing-library/react';
import axios from "axios"

// Sample data to check received data from database 
const movie1 = [{
  "__v": 0, 
  "_id": "60f802ba19092726678f2517", 
  "casts": "Bruce Willis, Alan Rickman, Bonnie Bedelia and more", 
  "category": {"__v": 0, "_id": "60f7fea473c33425420f7129", "name": "Action"}, 
  "description": "NYPD cop John McClane's plan to reconcile with his wife is interrupted when, after he arrives at her office, the building is overtaken by terrorists.", 
  "duration": "2h 12m", "highlight": "http://img.youtube.com/vi/jaJuwKCmJbY/maxresdefault.jpg", 
  "images": [], 
  "price": 10.9, 
  "publishYear": "1998", 
  "thumbnail": "https://occ-0-395-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcCwfM3yL50I0xxOWL6scK9k9ASlJrEqJZky6CEj4juGfuK59ASDSjFeIIyqazvNkUSW-nlL6Y-DJfzsTgsKfYwgOIU.jpg", 
  "title": "Die hard", 
  "trailerURL": "https://www.youtube.com/watch?v=jaJuwKCmJbY"
}];

const movie2 = [{
  "images":[],
  "_id":"60f835de4632e81ad5dac739",
  "title":"Gotham",
  "description":"Long before he was commissioner, rookie cop James Gordon takes on Gotham City crime and corruption to avenge the murder of Bruce Wayne's parents.",
  "duration":"5 seasons",
  "publishYear":"2019",
  "price":18.99,
  "thumbnail":"https://occ-0-395-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABe4dJ_YqYuo413Lc5SEgnaePcQsT0Mpc7tC3LrV5SO-Kr_AIvSBrQQW6d5ARfa-jC-_yExqzthXKrDHFZpQ1T572KNY.webp",
  "category":{"_id":"60f7fed473c33425420f7135",
  "name":"Dramas","__v":0},"trailerURL":"https://www.youtube.com/watch?v=mUe79BSig_4",
  "casts":"Ben McKenzie, Donal Logue, Jada Pinkett Smith, David Mazouz, Sean Pertwee, Camren Bicondova",
  "__v":0,
  "highlight":"http://img.youtube.com/vi/mUe79BSig_4/maxresdefault.jpg"
}];

// Testing fetching for all movies 
describe("Fetch in Home", () => {
  // Check if fetch return any data 
  it("Check if data is fetched", async () => {
    const res = await axios.get(`http://localhost:4000/api/v1/movies`);
    var received = res.data.data.movies;
    expect(received).toBeDefined();
  });

  // Check if certain genre are included in the received data 
  it("Check if a certain genre is in the fetched data", async () => {
    const res = await axios.get(`http://localhost:4000/api/v1/movies`);
    var received = res.data.data.movies.map((movie) => movie.category.name);
    expect(received).toContain("Action");
    expect(received).toContain("Dramas");
    expect(received).toContain("Award-Winning Films");
  });
  
  //Check received data include the sample data
  it("Check for a movie in fetched data", async () => {
    const expected1 = movie1;
    const res = await axios.get(`http://localhost:4000/api/v1/movies`);
    var received = res.data.data.movies.map((item) => item.movies);
    expect(received[0]).toEqual(expect.arrayContaining(expected1));
  });
});


// Test fetch movie with seach keywords "d" and "s"
describe("Fetch movie by Search", () => {
  it("Fetch data", async () => {
    // Assign expected data
    const expected1 = movie1;
    const expected2 = movie2;
    // Set search keywords
    var search1 = "d";
    var search2 = "g"
    // Fetch data 
    const res1 = await axios.get(`http://localhost:4000/api/v1/movies?name=${search1}`)
    const res2 = await axios.get(`http://localhost:4000/api/v1/movies?name=${search2}`)
    var received1 = res1.data.data.movies;
    var received2 = res2.data.data.movies;
    // Compare results
    expect(received1).toEqual(expect.arrayContaining(expected1));
    expect(received2).toEqual(expect.arrayContaining(expected2));
  });
});


// Testing fetching data filtered by category (genre) action and dramas
describe("Fetch movie by category", () => {
  it("Fetch data", async () => {
    // Assign expected data
    const expected1= movie1;
    const expected2= movie2;
    // Set search keywords
    const genre1 = "action";
    const genre2 = "dramas";
    // Fetch data 
    const res1 = await axios.get(`http://localhost:4000/api/v1/movies/category?name=${genre1}`)
    const res2 = await axios.get(`http://localhost:4000/api/v1/movies/category?name=${genre2}`)
    var received1 = res1.data.data.movies;
    var received2 = res2.data.data.movies;    
    // Compare results
    expect(received1).toEqual(expect.arrayContaining(expected1));
    expect(received2).toEqual(expect.arrayContaining(expected2));
  })
})

