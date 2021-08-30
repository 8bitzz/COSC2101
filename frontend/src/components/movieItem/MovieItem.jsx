import "./movieItem.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../service/auth-context";

const MovieItem = ({ movie, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleOnSubmit = () => {
    history.push(`/login`);
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleItemAdd = context.handleItemAdd;
        return (
          <div>
            {isHovered ? (
              // Effect when a movie card is hovered
              <div
                className="hoverItem bg-netflix-black"
                id="item"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ left: isHovered && index * 240 - 48 + index * 4 }}
              >
                <img src={movie.thumbnail} alt="" />
                <div className="itemInfo">
                  <div className="icons flex justify-between text-white items-center my-1">
                    <div className="flex justify-between text-white items-center">
                      <span>{movie.title}</span>
                    </div>
                    <div className="flex justify-between text-white items-center">
                      {localStorage.getItem("accessToken") ? (
                        <button onClick={() => handleItemAdd(movie._id)}>
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
                      ) : (
                        <button onClick={handleOnSubmit}>
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
                      )}

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
            ) : null}

            {/* Default movie card */}
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
      }}
    </AuthContext.Consumer>
  );
};

export default MovieItem;
