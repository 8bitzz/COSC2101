import Featured from '../../components/featured/Featured'
import MovieList from '../../components/movieList/MovieList'
import SearchMovieList from '../../components/movieList/SearchMovieList';
import FilteredMovieList from '../../components/movieList/FilteredMovieList'
import { useEffect, useState } from "react";
import axios from 'axios';
import "./navbar.css";


const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [movies, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);

  //Fetch movie from API
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies`)
      .then(res => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name))
        setMovie(res.data.data.movies.map(item => item.movies))
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line
  }, [])
  // console.log(movies)
  // console.log('cate', movies.map((item)=>item.filter(category=> category.category.name==="Dramas")))

  const displayMovieList = (search, category) => {
    if (search.length != 0) {
      return (
        <div>
          <Featured type="movie" />
          <SearchMovieList search={search} />
        </div>
      )
    }
    else if (category != "") {
      return (
        <div>
          <Featured type="movie" />
          <select name="category" id="category" class="p-3 ml-10 mt-10 border-2 bg-black border-white text-white" onChange={event => setCategory(event.target.value)}>
            <option value="" selected="selected">Genres</option>
            {
              movieList.map(ele => (
                <option key={ele} >{ele}</option>
              ))
            }
          </select>
          <FilteredMovieList category={category} />
        </div>
      )
    }
    else {
      return (
        <div>
          <Featured type="movie" />
          <select name="category" id="category" class="p-3 ml-10 mt-10 border-2 bg-black border-white text-white" onChange={event => setCategory(event.target.value)}>
            <option value="" selected="selected">Genres</option>
            {
              movieList.map(ele => (
                <option key={ele} >{ele}</option>
              ))
            }
          </select>
          {console.log(category)}
          {movieList.map((movieTitle, index) => {
            return (
              <MovieList key={index} title={movieTitle} movie={movies.map((item, index) => item.filter((category, index) => category.category.name === movieTitle))} />
            )
          })}
        </div>
      )

    }
  }

  return (
    <div className="bg-netflix-black overflow-hidden">
      <div className="navbar w-screen fixed top-0 z-50 text-white">
        <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
          <div className="flex items-center font-light">
            <img
              className="h-6 mr-8 cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
            <span className="mr-4 cursor-pointer">Home</span>
            <span className="mr-4 cursor-pointer">TV Shows</span>
            <span className="mr-4 cursor-pointer">Movies</span>
            <span className="mr-4 cursor-pointer">New & Popular</span>
          </div>
          <div className="flex items-center">
            <div className="search-bar">
              <div className="growing-search">
                <div className="input">
                  <input type="text" name="search" onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="submit">
                  <button type="submit" name="go_search">
                    <span className="fa fa-search"></span>
                  </button>
                </div>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <button className="bg-red-600 rounded-md py-2 px-4">Sign In</button>
          </div>
        </div>
      </div>

      {displayMovieList(search, category)}

      {/* {(search.length <= 0) ? (
        <div>
          <Featured type="movie" />
          <select name="category" id="category" class="p-3 ml-10 mt-10 border-2 bg-black border-white text-white" onChange={event => setCategory(event.target.value)}> 
            <option value="" selected="selected">Genres</option>
            <option value="Action">Action</option>
            <option value="Adventures">Adventures</option>
            <option value="Award-Winning Films">Award-Winning Films</option>
            <option value="Comedies">Comedies</option>
            <option value="Dramas">Dramas</option>
            <option value="Crimes & Thrillers">Crimes & Thrillers</option>
            <option value="Horror">Horror</option>
            <option value="Only on Netflix">Only on Netflix</option>
          </select>
          {console.log(category)}
          {movieList.map((movieTitle, index) => {
          return (
            <MovieList key = {index} title={movieTitle} movie={movies.map((item,index)=>item.filter((category,index)=> category.category.name===movieTitle))}/>
          )
          })}
        </div>
      ) : (
        <div>
          <Featured type="movie" />
          <SearchMovieList search={search} />
        </div>
      )} */}
    </div>
  )
}

export default Home
