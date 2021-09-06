import Featured from "../../components/featured/Featured";
import MovieList from "../../components/movieList/MovieList";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BASE_API_URL } from '../../utils/constants';

const Home = () => {
  const [movies, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [highlightedMovie, setHighLightedMovie] = useState([]);
  
  //Fetch movie from API
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/movies`)
      .then((res) => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name)); //Get all available categories
        setMovie(res.data.data.movies.map((item) => item.movies)); //Get all movies
        setHighLightedMovie(res.data.data.highlightMovie); //Get featured movie
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar />
      <div className="bg-netflix-black overflow-hidden">
        {/* {displayMovieList(search, category)} */}
        <Featured type="movie" movie={highlightedMovie} />
        {movieList.map((movieTitle, index) => {
          return (
            <MovieList
              key={index}
              title={movieTitle}
              movie={movies.map((item, index) =>
                item.filter(
                  (category, index) => category.category.name === movieTitle
                )
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
