import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from "axios";
import "./movieList.css";

const FilteredMovieList = ({ category }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);

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
  }, [category])

  const listRef = useRef();
  console.log(category);

  return (
    <div className="w-full mt-10">
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