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
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

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

  function updateValue() {
    return setValue(0);
  }

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

  const listRef = useRef();
  return (
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{minHeight: "100vh"}}>
      <NavBar count={count}/>
      <div className="mb-10 text-2xl font-bold text-white">
        <p>Result for "{search}" </p>
      </div>
      <div className="flex w-full mt-24">
        {filteredMovies.length <= 0 ? (
          <div className="text-white ml-12">
            <p>There is no matching movies with provided keyword</p>
          </div>
        ) : (
          <div
            className="movieContainer ml-12 mt-3 flex flex-col flex-wrap"
            ref={listRef}
          >
            <div className="flex gap-2 flex-wrap">
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

export default SearchMovieList;
