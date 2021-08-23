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
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

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

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          }
        })
        .then((res) => {
          setCount(res.data.data.carts.length)
          setValue(res.data.data.carts.length)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      return;
    }
  }, [value])

  function updateValue() {
    return setValue(0);
  }

  return (
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{minHeight: "100vh"}}>
      <NavBar count={count}/>
      <p className="my-10 ml-12 text-3xl font-bold text-white">{category}</p>
      <div className=" flex bg-netflix-black h-screen w-full">
        {filteredMovies.length <= 0 ? (
          <div className="text-white ml-12">
            <p>There is no movies at this category at the moment</p>
          </div>
        ) : (
          <div
            className="movieContainer ml-12"
          >
            <div className="flex flex-wrap gap-2">
              {filteredMovies.map((movie, index) => {
                return <MovieItem funct={updateValue} movie={movie} key={movie._id} index={index} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredMovieList;
