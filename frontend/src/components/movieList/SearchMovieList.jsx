import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import "./movieList.css";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const SearchMovieList = () => {
  const param = useLocation().search;
  const search = new URLSearchParams(param).get("term");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies?name=${search}`)
      .then((res) => {
        console.log(res);
        setFilteredMovies(res.data.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);
  const listRef = useRef();
  return (
    <div>
      <NavBar />
      <div className="container-fluid h-screen w-full mt-24">
        {filteredMovies.length <= 0 ? (
          <div className="text-white ml-12">
            <p>There is no matching movies with provided keyword</p>
          </div>
        ) : (
          <div
            className="movieContainer ml-12 mt-3 flex flex-col flex-wrap"
            ref={listRef}
          >
            <div className="mb-10 text-2xl font-bold text-white">
              <p>Result for "{search}" </p>
            </div>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4 ">
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

export default SearchMovieList;
