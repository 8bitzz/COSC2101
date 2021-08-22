import "./navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../service/auth-context";
import { BASE_API_URL } from '../../utils/constants';

function NavBar(props) {

  const [movieList, setMovieList] = useState([]);
  const [count, setCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const [isScrolled, setIsScrolled] = useState(false);

  // Put search term to URL param then push to /search page
  const putSearchParam = (event) => {
    if (searchTerm === "") {
      return;
    }
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("term", searchTerm);
    } else {
      params.delete("term");
    }
    history.push({
      pathname: "/search",
      search: params.toString(),
    });
  };
  const handleSearchSubmit = (event) => {
    putSearchParam();
    event.preventDefault();
  };

  // Put genre to URL param then push to /genre page
  const putFilterParam = (genre) => {
    if (genre === "") {
      return;
    }
    const params = new URLSearchParams();
    if (genre) {
      params.append("type", genre);
    } else {
      params.delete("type");
    }
    history.push({
      pathname: "/genre",
      search: params.toString(),
    });
  };

  const handleCategorySelect = (event) => {
    let genre = event.target.value;
    putFilterParam(genre);
    event.preventDefault();
  };

  // Chech if user is scrolling to change color of navbar
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll == null);
  }

  //Fetch movie from API
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/movies`)
      .then((res) => {
        setMovieList(res.data.data.movies.map((movie) => movie.category.name));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  //Fetch cart from API
  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      axios
      .get(`${BASE_API_URL}/api/v1/carts`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        setCartItem(res.data.data.carts)
        setCount(res.data.data.carts.length)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      return;
    } 
  },[props.count]);

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div className={isScrolled ? "navbar bg-netflix-black" : "navbar"}>
            <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
              <div className="flex items-center font-light">
                <Link to="/">
                  <img
                    className="h-6 mr-8 cursor-pointer"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    alt=""
                  />
                </Link>
                <select
                  name="category"
                  id="category"
                  className="p-3 ml-10 border-2 bg-black border-white text-white"
                  onChange={handleCategorySelect}
                >
                  <option value="">Genres</option>
                  {movieList.map((ele) => (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex items-center">
                <div className=" bg-netflix-black rounded-md my-auto opacity-80 p-2 mr-4 ">
                  <form
                    className=" bg-netflix-black flex items-center"
                    onSubmit={handleSearchSubmit}
                  >
                    <input
                      type="text"
                      name="search"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-netflix-black text-gray-400 focus:outline-none "
                      placeholder="Search movie"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </div>
                {localStorage.getItem('accessToken') && 
                <Link to="/cart">
                  <button className="py-4 px-1 relative border-2 border-transparent  rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart" style={{ marginRight: '2px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-4 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                      </path>
                    </svg>
                    <span className="absolute inset-0 object-right-top -mr-6">
                      <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                        {props.count}
                      </div>
                    </span>
                  </button>
                </Link>
                }

                {!localStorage.getItem('accessToken') &&
                  <button className="bg-red-600 rounded-md py-2 px-4">
                    <Link to="/login">Sign In</Link>
                  </button>
                }
                {localStorage.getItem('accessToken') && <button className="bg-red-600 rounded-md py-2 px-4" onClick={context.logout}>
                  Log Out
                </button>}
              </div>
            </div>
          </div>
        )
      }}
    </AuthContext.Consumer>
  );
};

export default NavBar;
