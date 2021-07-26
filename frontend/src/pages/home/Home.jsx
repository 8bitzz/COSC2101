import Featured from '../../components/featured/Featured'
import MovieList from '../../components/movieList/MovieList'
import SearchMovieList from '../../components/movieList/SearchMovieList';
import FilteredMovieList from '../../components/movieList/FilteredMovieList'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "./navbar.css";


const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [movies, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [highlightedMovie, setHighLightedMovie] = useState([]);

  let history = useHistory();

  //Fetch movie from API
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies`)
      .then(res => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name))
        setMovie(res.data.data.movies.map(item => item.movies))
        setHighLightedMovie(res.data.data.highlightMovie)
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])
  //console.log('highlight', highlightedMovie)
  // console.log('cate', movies.map((item)=>item.filter(category=> category.category.name==="Dramas")))

  // const displayMovieList = (search, category) => {
  //   if (search.length !== 0) {
  //     return (
  //       <div>
  //        <br />
  //         <SearchMovieList search={search} />
  //       </div>
  //     )
  //   }
  //   else if (category !== "") {
  //     return (
  //       <div>
  //         <FilteredMovieList category={category} />
  //       </div>
  //     )
  //   }
  //   else {
  //     return (
  //       <div>
  //         <Featured type="movie" movie = {highlightedMovie}/>
  //         {movieList.map((movieTitle, index) => {
  //           return (
  //             <MovieList key={index} title={movieTitle} movie={movies.map((item, index) => item.filter((category, index) => category.category.name === movieTitle))} />
  //           )
  //         })}
  //       </div>
  //     )
  //   }
  // }

  return (
    <div className="bg-netflix-black overflow-hidden">
      {/* {displayMovieList(search, category)} */}
      <Featured type="movie" movie = {highlightedMovie}/>
          {movieList.map((movieTitle, index) => {
            return (
              <MovieList key={index} title={movieTitle} movie={movies.map((item, index) => item.filter((category, index) => category.category.name === movieTitle))} />
            )
          })}
    </div>
  )
}

export default Home
