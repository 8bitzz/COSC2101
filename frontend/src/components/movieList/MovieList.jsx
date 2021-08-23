import "./movieList.css";
import MovieItem from "../movieItem/MovieItem";
import { useRef, useState, useEffect } from "react";

const MovieList = ({ funct, title, movie }) => {
  const [newArr, setNewArr] = useState([]);
  //For each matching movies from Home, add into a new movie list.
  useEffect(()=>{
    for (let i=0; i< movie.length; i++) { 
      if (movie[i].length !== 0 )  setNewArr(movie[i])
    }  
  }, [movie])
  
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x / 16;
    console.log(distance);
    if (direction === "left" && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${12.25 + distance}rem)`;
      setSlideNumber(slideNumber - 1);
    }
    if (direction === "right" && slideNumber < 3) {
      listRef.current.style.transform = `translateX(${-18.25 + distance}rem)`;
      setSlideNumber(slideNumber + 1);
    } 
  };
  
  return (
    <div className="w-full mt-10">
      <div className="nav-bar">
      </div>
      <span className="text-white text-2xl font-bold ml-12">{title}</span>
      <div className=" text-white relative ">
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
        <div className="movieContainer ml-12 mt-3 flex flex-wrap" ref={listRef}>
          {newArr.map((movie, index) => {
            return (
              <MovieItem funct={funct} movie={movie} key={movie._id} index={index} />
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

export default MovieList;
