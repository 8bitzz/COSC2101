import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import "./movieList.css";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { BASE_API_URL } from '../../utils/constants';

const SearchMovieList = () => {
  //Get the param from search URL
  const param = useLocation().search;
  //Set param to search keyword
  const search = new URLSearchParams(param).get("term");

  const [filteredMovies, setFilteredMovies] = useState([]);

  //Fetch data according to search keyword
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/movies?name=${search}`)
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
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{minHeight: "100vh"}}>
      <NavBar />

      <div className="mb-10 text-2xl font-bold text-white">
        <p>Result for "{search}" </p>
      </div>

      <div className="flex w-full mt-24">
        {filteredMovies.length <= 0 ? (
          // Message when result is empty
          <div className="text-white ml-12">
            <p>There is no matching movies with provided keyword</p>
          </div>
        ) : (
          // List movies if result not null
          <div
            className="movieContainer ml-12 mt-3 flex flex-col flex-wrap"
            ref={listRef}
          >
            <div className="flex gap-2 flex-wrap">
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
