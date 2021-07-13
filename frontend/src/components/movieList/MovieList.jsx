import "./movieList.css";
import { useRef } from "react";

const MovieList = ({ title }) => {
  const listRef = useRef();
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x / 16;
    console.log(distance)
    if (direction === "left") {
      listRef.current.style.transform = `translateX(${54 + distance}rem)`;
    }
    if (direction === "right") {
      listRef.current.style.transform = `translateX(${-54 + distance}rem)`;
    }
  }
  return (
    <div className="w-full mt-14">
      <span className="text-white text-2xl font-bold ml-12">{title}</span>
      <div className=" text-white relative">
        <div className="sliderArrow w-12 h-full absolute inset-y-0 left-0 z-40 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mt-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => handleClick("left")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="movieContainer ml-12 mt-3 flex flex-row" ref={listRef}>
          {movies.map(movie => {
            return (
              <MovieItem movie={movie} key={movie.id} />
            );
          })}
        </div>
        <div className="sliderArrow w-12 h-full absolute inset-y-0 right-0 z-40 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mt-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => handleClick("right")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const MovieItem = ({movie}) => {
  return (
    <div className="bg-gray-50 w-60 h-36 mr-1 movieItem text-white">
      <img
        src={movie.imgSrc}
        alt=""
        className="w-full h-full object-cover rounded"
      />
      <span>{movie.id}</span>
    </div>
  )
}

const movies = [{
  id: 1,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},
{
  id: 2,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},
{
  id: 3,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 4,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 5,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 6,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 7,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 8,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 9,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 10,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 11,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 12,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  id: 13,
  trailer: "",
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},  
]

export default MovieList;
