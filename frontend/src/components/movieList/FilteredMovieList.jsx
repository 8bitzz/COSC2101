import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./movieList.css";

const FilteredMovieList = ({location}) => {

  let history = useHistory();

  let genre = location
  const category = new URLSearchParams(genre).get("term")
  console.log("genre", genre)
  console.log("category", category)


  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genreTerm, setGenreTerm] = useState(category || "")
  console.log("genreTerm", genreTerm)
  console.log(`http://localhost:4000/api/v1/movies/category?name=${category}`)
  
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies/category?name=${category}`)
      .then(res => {
        console.log(res)
        setFilteredMovies(res.data.data.movies)
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line      
  }, [genre])

  const listRef = useRef();
  // console.log(category);
  // console.log(filteredMovies)

  return (
    <div className="container h-screen w-full mt-40 mx-10">
      <p className="mb-10 ml-12 text-3xl font-bold text-white">{category}</p>
      {(filteredMovies.length <= 0) ? (
        <div class="text-white">
          <p>There is no movies at this category at the moment</p>
        </div>
      ) : (
        <div className="movieContainer ml-12 mt-3 flex flex-wrap" ref={listRef}>
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMovies.map((movie, index) => {
              return (
                <MovieItem movie={movie} key={movie.id} index={index}/>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilteredMovieList