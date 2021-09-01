import { render, screen } from '@testing-library/react';
import axios from "axios"
import DateFormatter, { formatCardDate, getTotalPrice } from './utils/utils';

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

const cart = [
  {
      "_id": "612d92d5d0a96503b06f00e9",
      "createdBy": "612652e635352a92c413b493",
      "movie": {
          "images": [],
          "_id": "60f82c01db6ff52c99fc171c",
          "title": "Breakpoint Bad",
          "description": "A high school chemistry teacher dying of cancer teams with a former student to secure his family's future by manufacturing and selling crystal meth.",
          "duration": "2h 12m",
          "publishYear": "2013",
          "price": 10.9,
          "thumbnail": "https://occ-0-395-58.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUr3Y1-NF-H2vxX46gBEwdYqSlvDsY126karuPPoXnHjijxuk1cXPIb8lrLk8TfN3YXWzniCLhrTOROMXuLaKcji8lI.jpg",
          "category": "60f7fea473c33425420f7129",
          "trailerURL": "https://www.youtube.com/watch?v=HhesaQXLuRY",
          "casts": "Bryan Cranston, Aaron Paul, Anna Gunn, more.",
          "__v": 0
      },
      "createdAt": "2021-08-31T02:24:21.736Z",
      "__v": 0
  },
  {
      "_id": "612d92d7d0a96503b06f00ed",
      "createdBy": "612652e635352a92c413b493",
      "movie": {
          "images": [],
          "_id": "610d119e68de48deec1bcb53",
          "title": "Chasing Coral",
          "description": "Divers, scientists and photographers around the world mount an epic underwater campaign to document the disappearance of coral reefs.",
          "duration": "1h 29m",
          "publishYear": "2017",
          "price": 11.99,
          "thumbnail": "https://occ-0-325-395.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABfiFcvxTHwDmo09AtFa0WuCMxjFEJTZCIaynzV2kgMY4QppZ82OOHvWSILvlAruaWQOR8Ra7mqKcfCLEAcisSuTmGslDVx489GoylqBoGDLTq8Iyw1bej1GkvcaX.jpg?r=211",
          "category": "60f7feb573c33425420f712d",
          "trailerURL": "https://www.youtube.com/watch?v=b6fHA9R2cKI",
          "casts": "N/A",
          "__v": 0
      },
      "createdAt": "2021-08-31T02:24:23.105Z",
      "__v": 0
  }
]

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

describe("Test date formatter", () => {
  it("DateFormatter", () => {
    const testDate = "2021-08-30T10:43:16.284+00:00";
    const expected = "30-08-2021"; 
    const received = DateFormatter(testDate);
    expect(received).toEqual(expected);
  })

  it("formatCardDate", () => {
    const cardDate = "12 / 23";
    const expected = "12/2023";
    const received = formatCardDate(cardDate);
    expect(received).toEqual(expected);
  })
})

describe("Calculate total price of a cart", () => {
  it("getTotalPrice", () => {
    const testData = cart;
    const expected = "22.89";
    const received = getTotalPrice(testData);
    expect(received).toEqual(expected);
  })
})