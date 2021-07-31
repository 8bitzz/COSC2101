import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import "./movieList.css";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const FilteredMovieList = ({ location }) => {
  // let genre = location
  // const category = new URLSearchParams(genre).get("term")
  // console.log("genre", genre)
  // console.log("category", category)
  // const [filteredMovies, setFilteredMovies] = useState([]);
  // const [genreTerm, setGenreTerm] = useState(category || "")
  // console.log("genreTerm", genreTerm)
  // console.log(`http://localhost:4000/api/v1/movies/category?name=${category}`)

  const param = useLocation().search;
  const category = new URLSearchParams(param).get("type");
  console.log(category);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies/category?name=${category}`)
      .then((res) => {
        console.log(res);
        setFilteredMovies(res.data.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [category]);

  const listRef = useRef();
  // console.log(category);
  // console.log(filteredMovies)

  return (
    <div>
      <NavBar />
      <div className="bg-netflix-black h-screen w-full mt-24">
        <p className="mb-10 ml-12 text-3xl font-bold text-white">{category}</p>
        {filteredMovies.length <= 0 ? (
          <div className="text-white">
            <p>There is no movies at this category at the moment</p>
          </div>
        ) : (
          <div
            className="movieContainer ml-12 mt-3 flex flex-wrap"
            ref={listRef}
          >
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMovies.map((movie, index) => {
                return <MovieItem movie={movie} key={movie._id} index={index} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredMovieList;
