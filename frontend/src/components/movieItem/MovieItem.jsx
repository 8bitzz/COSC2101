import "./movieItem.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
const MovieItem = ({ funct, movie, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleCart = (e) => {
    e.preventDefault();
    var url = `http://localhost:4000/api/v1/carts?movie_id=${movie._id}`
    const data = {
      movie: movie._id,
      createdBy: localStorage.getItem('_id')
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
    axios.post(url, data, axiosConfig)
    funct()
  };

  const handleOnSubmit = () => {
    history.push(`/login`);
  };

  const hoverItem = (
    <div
      className="hoverItem bg-netflix-black"
      id="item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 240 - 48 + index * 4 }}
    >
      <img
        src={movie.thumbnail}
        alt=""
      />
      <div className="itemInfo">
        <div className="icons flex justify-between text-white items-center my-1">
          <div className="flex justify-between text-white items-center">
            <span>{movie.title}</span>
          </div>
          <div className="flex justify-between text-white items-center">
            {localStorage.getItem("accessToken")?(
            <button onClick ={handleCart}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 border rounded-full p-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"

            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            </button>
            ):(<button onClick={handleOnSubmit}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 border rounded-full p-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"

            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            </button>)}
            
            <Link to={`/details/${movie._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 border rounded-full p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="itemInfoTop">
          <span>{movie.duration}</span>
          <span className="limit">{movie.duration}</span>
          <span>{movie.publishYear}</span>
        </div>
        <div className="desc">{movie.description}</div>
      </div>
    </div>
  );
  
  return (
    <div>
      {isHovered ? hoverItem : null}
      <div
        className="movieItem w-60 h-36 mr-1 bg-netflix-black text-white cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 240 - 48 + index * 4 }}
      >
        <img
          src={movie.thumbnail}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default MovieItem;