import Featured from '../../components/featured/Featured'
import MovieList from '../../components/movieList/MovieList'
import SearchMovieList from '../../components/movieList/SearchMovieList';
import { useState } from "react";
import "./navbar.css";
const movieList = ["Award-Winning", "Crime", "Action", "Documentaries", "Horror", "Sci-Fi", "Romance", "Children & Family", "Anime", "Fantasy"]

const Home = () => {
  const [search, setSearch] = useState("");
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
      {(search.length <= 0) ? (
        <div>
          <Featured type="movie" />
          {movieList.map((movieTitle, index) => {
            return (
              <MovieList key={index} title={movieTitle} movie={movies}/>
            )
          })}
        </div>
      ) : (
        <div>
          <Featured type="movie" />
          <SearchMovieList  search={search} movie={movies}/>  
        </div>

      )}
    </div>
  )
}
const movies = [
  {
    id: 1,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 2,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 3,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 4,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 5,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 6,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 7,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 8,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 9,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 10,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 11,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 12,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
  {
    id: 13,
    trailer: "",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
    length: "1 hour 14 mins",
    limit: "16+",
    year: "1999",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
    genre: "Action",
  },
];
export default Home
