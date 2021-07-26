import Home from "./pages/home/Home";
import Register from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
import FilteredMovieList from "./components/movieList/FilteredMovieList";
import "./pages/home/navbar.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [movies, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);

  let history = useHistory();

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
    putSearchTerm(event.target.value);
    event.preventDefault();
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
    putCategoryTerm(event.target.value);
    event.preventDefault();
  }

  const putCategoryTerm = (value) => {
    const params = new URLSearchParams();
    console.log("putCategoryTerm", value)
    if (value === "") {
      return
    }
    if (value) {
      params.append("term", value)
    }
    else {
      params.delete("term")
    }
    history.push({
      pathname: "/genre",
      search: params.toString()
    })
  }

  const putSearchTerm = (value) => {
    const params = new URLSearchParams();
    console.log(value)
    if (value === null) {
      history.replace("/search", null)
      return
    }
    if (value) {
      params.append("term", value)
    }
    else {
      params.delete("term")
    }
    history.push({
      pathname: "/search",
      search: params.toString()
    })
  }
  return (
    <div className="m-0">
      <Router>
      <div className="bg-netflix-black overflow-hidden">
        <div className="navbar w-screen fixed top-0 z-50 text-white">
          <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
            <div className="flex items-center font-light">
              <img
                className="h-6 mr-8 cursor-pointer"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
              />
              <select name="category" id="category" className="p-3 ml-10 border-2 bg-black border-white text-white" onChange={event => handleChange(event)}>
                  <option value="" selected="selected">Genres</option>
                  {
                    movieList.map(ele => (
                      <option key={ele} >{ele}</option>
                    ))
                  }
              </select>
            </div>
            <div className="flex items-center">
              <div className="search-bar">
                <div className="growing-search">
                  <div className="input">
                    <input type="text" name="search" onChange={e => handleSearch(e)} />
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
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/genre"><FilteredMovieList location={history.location.search}/></Route>
            <Route path="/search"><SearchMovieList searchTerm = {history.location.search}/></Route>
            <Route path={`/details/:_id`} component={Details} ></Route>
          </Switch>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
