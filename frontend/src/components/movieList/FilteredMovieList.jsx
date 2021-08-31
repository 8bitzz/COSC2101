import { useEffect, useState } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import "./movieList.css";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { BASE_API_URL } from '../../utils/constants';

const FilteredMovieList = ({ location }) => {
  //Set category param from current search URL
  const param = useLocation().search;
  //Set param to category
  const category = new URLSearchParams(param).get("type");

  const [filteredMovies, setFilteredMovies] = useState([]);

  //Fetch data according to the category
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/movies/category?name=${category}`)
      .then((res) => {
        console.log(res);
        setFilteredMovies(res.data.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  return (
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{minHeight: "100vh"}}>
      <NavBar />
      <p className="my-10 ml-12 text-3xl font-bold text-white">{category}</p>
      <div className=" flex bg-netflix-black h-screen w-full">
        {filteredMovies.length <= 0 ? (
          // Show message if returned list is empty
          <div className="text-white ml-12">
            <p>There is no movies at this category at the moment</p>
          </div>
        ) : (
          // Display items if not null
          <div
            className="movieContainer ml-12"
          >
            <div className="flex flex-wrap gap-2">
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
