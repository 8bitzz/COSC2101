import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from 'axios';
import "./movieList.css";
import { useHistory, useLocation } from "react-router-dom";

const SearchMovieList = ({searchTerm}) => {
  const [filteredmovies, setFilteredMovie] = useState([]);
  let history = useHistory();
  let term = searchTerm;
  const search = new URLSearchParams(term).get("term")

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies?name=${search}`)
      .then(res => {
        console.log(res)
        setFilteredMovie(res.data.data.movies)
      })
      .catch(err => {
        console.log(err)
      })
  }, [search])
  const listRef = useRef();
  return (
    <div className="container-fluid h-screen w-full mt-40 mx-10">
     
      {(filteredmovies.length <= 0) ? (
        <div class="text-white">
          <p>There is no matching movies with provided keyword</p>
        </div>
      ) : (
        <div className="movieContainer ml-12 mt-3 flex flex-wrap" ref={listRef}>
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredmovies.map((movie, index) => {
              return (
                <MovieItem movie={movie} key={movie.id} index={index}/>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}


export default SearchMovieList