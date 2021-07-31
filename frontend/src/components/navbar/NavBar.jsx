import "./navbar.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  // const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  // const [movies, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);
  // const [isFilled, setIsFilled] = useState(false);
  // const [isSet, setIsSet] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  
  const putSearchParam = (event) => {
    if (searchTerm === "") {
      return;
    }
    const params = new URLSearchParams()
    if (searchTerm) {
      params.append("term", searchTerm)
    } else {
      params.delete("term")
    }
    history.push({
      pathname: '/search',
      search: params.toString()
    })
  }
  const handleSearchSubmit = (event) => {
    putSearchParam();
    event.preventDefault();
  }

  const putFilterParam = (genre) => {
    if (genre === "") {
      return;
    }
    const params = new URLSearchParams()
    if (genre) {
      params.append("type", genre)
    } else {
      params.delete("type")
    }
    history.push({
      pathname: '/genre',
      search: params.toString()
    })
  }

  const handleCategorySelect = (event) => {
    // setGenre(event.target.value);
    // console.log(genre);
    let genre = event.target.value;
    putFilterParam(genre);
    event.preventDefault();
  }


  //Fetch movie from API
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/movies`)
      .then((res) => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name));
        // setMovie(res.data.data.movies.map((item) => item.movies));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  // Handle change when genre selected
  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  //   putCategoryTerm(event.target.value);
  //   event.preventDefault();
  //   if (event.target.value === "") {
  //     isSet(false);
  //   } else {
  //     setIsSet(true);
  //   }
  // };

  // // Update URL when filter by genre
  // const putCategoryTerm = (value) => {
  //   const params = new URLSearchParams();
  //   console.log("putCategoryTerm", value);
  //   if (value === "") {
  //     history.push("");
  //     return;
  //   }
  //   if (value) {
  //     params.append("term", value);
  //   } else {
  //     params.delete("term");
  //   }
  //   history.push({
  //     pathname: "/genre",
  //     search: params.toString(),
  //   });
  // };

  // //Function to set path for Link at Genre selector
  // const setGenrePath = () => {
  //   if (isSet === true) {
  //     return "/genre";
  //   } else {
  //     return "/";
  //   }
  // };

  // Function to handle when search field filled
  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   putSearchTerm(event.target.value);
  //   event.preventDefault();
  //   if (event.target.value === "") {
  //     setIsFilled(false);
  //   } else {
  //     setIsFilled(true);
  //   }
  // };

  // Update URL when search
  // const putSearchTerm = (value) => {
  //   const params = new URLSearchParams();
  //   if (value === "") {
  //     history.push("");
  //     return;
  //   }
  //   if (value) {
  //     params.append("term", value);
  //   } else {
  //     params.delete("term");
  //   }
  //   history.push({
  //     pathname: "/search",
  //     search: params.toString(),
  //   });
  // };

  // const setSearchPath = () => {
  //   if (isFilled === true) {
  //     return "/search";
  //   } else {
  //     return "/";
  //   }
  // };


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
          {/* <Link to={setGenrePath}> */}
            <select
              name="category"
              id="category"
              className="p-3 ml-10 border-2 bg-black border-white text-white"
              // onChange={(event) => handleChange(event)}
              onChange={handleCategorySelect}
            >
              <option value="">
                Genres
              </option>
              {movieList.map((ele) => (
                <option key={ele} value={ele}>{ele}</option>
              ))}
            </select>
          {/* </Link> */}
        </div>
        <div className="flex items-center">
          <div className="search-bar">
            <div className="growing-search">
              <form className="input" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="search"
                  // onChange={(e) => handleSearch(e)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              {/* <Link to={setSearchPath}> */}
                {/* <div className="ml-10 border-2 bg-black border-white text-white">
                  <button type="button" onClick={handleSubmit}>Search</button>
                </div> */}
              {/* </Link> */}
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
