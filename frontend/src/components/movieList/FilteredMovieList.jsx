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
  console.log(category);
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
    <div>
      <NavBar />
      <div className="bg-netflix-black h-screen w-full mt-24">
        <p className="mb-10 ml-12 text-3xl font-bold text-white">{category}</p>
        {filteredMovies.length <= 0 ? (
          <div className="text-white ml-12">
            <p>There is no movies at this category at the moment</p>
          </div>
        ) : (
          <div
            className="movieContainer ml-12 mt-3 flex flex-wrap"
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
