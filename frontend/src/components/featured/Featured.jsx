import "./featured.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../service/auth-context";

const Featured = ({ type, movie }) => {
  const history = useHistory();

  const handleOnSubmit = () => {
    history.push(`/login`);
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleItemAdd = context.handleItemAdd;
        return (
          <div className="featured relative ">
            <img
              src={movie.thumbnail}
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
            <div className="w-2/5 absolute inset-x-14 bottom-14 flex flex-col text-white">
              {/* Movie summarised info */}
              <h1 className="text-5xl font-extrabold">{movie.title}</h1>
              <span className="my-6 text-xl font-medium drop-shadow-md">
                {movie.description}
              </span>
              {/* Add To Cart button */}
              <div className="flex items-center">
                {localStorage.getItem("accessToken") ? (
                  // Button to add movie to cart if the user is logged in
                  <button
                    onClick={() => handleItemAdd(movie._id)}
                    className="flex items-center bg-gray-50 text-netflix-black cursor-pointer font-medium text-xl rounded-md py-3 px-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3">Add to cart</span>
                  </button>
                ) : (
                  // Button redirecting to login page if the user is not logged in
                  <button
                    onClick={handleOnSubmit}
                    className="flex items-center bg-gray-50 text-netflix-black cursor-pointer font-medium text-xl rounded-md py-3 px-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3">Add to cart</span>
                  </button>
                )}

                {/* More Info button */}
                <Link to={`/details/${movie._id}`}>
                  <button className="flex items-center bg-gray-400 text-white cursor-pointer font-medium text-xl rounded-md ml-3 py-3 px-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-3">More Info</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Featured;
