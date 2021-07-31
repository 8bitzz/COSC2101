import "./navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      .then((res) => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name));
        setMovie(res.data.data.movies.map((item) => item.movies));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  // Function to handle when search field filled
  const handleSearch = (event) => {
    setSearch(event.target.value);
    putSearchTerm(event.target.value);
    event.preventDefault();
    if (event.target.value === "") {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  };

  // Handle change when genre selected
  const handleChange = (event) => {
    setCategory(event.target.value);
    putCategoryTerm(event.target.value);
    event.preventDefault();
    if (event.target.value === "") {
      isSet(false);
    } else {
      setIsSet(true);
    }
  };

  // Update URL when filter by genre
  const putCategoryTerm = (value) => {
    const params = new URLSearchParams();
    console.log("putCategoryTerm", value);
    if (value === "") {
      history.push("");
      return;
    }
    if (value) {
      params.append("term", value);
    } else {
      params.delete("term");
    }
    history.push({
      pathname: "/genre",
      search: params.toString(),
    });
  };

  // Update URL when search
  const putSearchTerm = (value) => {
    const params = new URLSearchParams();
    if (value === "") {
      history.push("");
      return;
    }
    if (value) {
      params.append("term", value);
    } else {
      params.delete("term");
    }
    history.push({
      pathname: "/search",
      search: params.toString(),
    });
  };

  const setSearchPath = () => {
    if (isFilled === true) {
      return "/search";
    } else {
      return "/";
    }
  };

  //Function to set path for Link at Genre selector
  const setGenrePath = () => {
    if (isSet === true) {
      return "/genre";
    } else {
      return "/";
    }
  };

  return (
    <div className="navbar w-screen fixed top-0 z-50 text-white">
      <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
        <div className="flex items-center font-light">
          <Link to="/">
            <img
              className="h-6 mr-8 cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link to={setGenrePath}>
            <select
              name="category"
              id="category"
              className="p-3 ml-10 border-2 bg-black border-white text-white"
              onChange={(event) => handleChange(event)}
            >
              <option value="" selected="selected">
                Genres
              </option>
              {movieList.map((ele) => (
                <option key={ele}>{ele}</option>
              ))}
            </select>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="search-bar">
            <div className="growing-search">
              <div className="input">
                <input
                  type="text"
                  name="search"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <Link to={setSearchPath}>
                <div className="ml-10 border-2 bg-black border-white text-white">
                  <button type="submit">Search</button>
                </div>
              </Link>
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
          <button className="bg-red-600 rounded-md py-2 px-4">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
