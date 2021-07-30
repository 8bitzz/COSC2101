import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
  const [isFilled, setIsFilled] = useState(false);
  const [isSet, setIsSet] = useState(false);
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

  // Function to handle when search field filled 
  const handleSearch = (event) => {
    setSearch(event.target.value); 
    putSearchTerm(event.target.value);
    event.preventDefault();
    if (event.target.value === "") {
      setIsFilled(false)
    }
    else {
      setIsFilled(true)
    }
  }

  // Handle change when genre selected 
  const handleChange = (event) => {
    setCategory(event.target.value);
    putCategoryTerm(event.target.value);
    event.preventDefault();
    if (event.target.value === "") {
      isSet(false)
    }
    else {
      setIsSet(true)
    }
  }

  // Update URL when filter by genre
  const putCategoryTerm = (value) => {
    const params = new URLSearchParams();
    console.log("putCategoryTerm", value)
    if (value === "") {
      history.push("")
      return;
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

  // Update URL when search 
  const putSearchTerm = (value) => {
    const params = new URLSearchParams();
    if (value === "") {
      history.push("")
      return;
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

  const setSearchPath = () => {
    if (isFilled === true) {
      return "/search" 
    }
    else {
      return "/" 
    }
  }

  //Function to set path for Link at Genre selector
  const setGenrePath = () => {
    if (isSet === true) {
      return "/genre" 
    }
    else {
      return "/" 
    }
  }

  return (
    <div className="m-0">
      <Router>
        <div className="bg-netflix-black overflow-hidden">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/genre"><FilteredMovieList location={history.location.search} /></Route>
            <Route path="/search"><SearchMovieList searchTerm={history.location.search} /></Route>
            <Route path={`/details/:_id`} component={Details} ></Route>
            <Route path="/signup" component={Signup} ></Route>
            <Route path="/login" component={Login} ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
