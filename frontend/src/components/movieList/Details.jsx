import React from "react";
import "./movieList.css";
import "./details.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { BASE_API_URL } from "../../utils/constants";
import AuthContext from "../../service/auth-context";

export default function Details(props) {
  const history = useHistory();

  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState([]);
  var gerne = "";

  // Get the _id of the movie from props and fectch API to get data of the movie
  useEffect(() => {
    const _id = props.match.params._id;
    const url = `${BASE_API_URL}/api/v1/movies/${_id}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setMovie(res.data.data.movie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params._id]);
  
  // Fetch the categories list in categories API to compare with the value of gerne
  // Result genre returned in movie API is categories _id 
  // so that we need to fetch category list to compare and get the gerne name for the movie
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/categories`)
      .then((res) => {
        console.log(res);
        setCategory(res.data.data.categories.map((item) => item));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  // Function to redirect user to login if not logged in
  const handleOnSubmit = () => {
    history.push(`/login`);
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleItemAdd = context.handleItemAdd;
        return (
          <div>
            <NavBar />
            <div
              className="h-screen w-full mt-40 mx-10"
              style={{ marginLeft: 0 + "px", marginTop: 0 + "px" }}
            >
              <div className="bg-netflix-black overflow-hidden text-white md:object-center">
                {/* Movie trailer */}
                <div className="movie-wrapper">
                  <div className="trailer-wrapper min-h-full pt-100">
                    <iframe
                      height="550px"
                      title = "trailer"
                      width="100%"
                      allowFullScreen
                      src={
                        movie.trailerURL
                          ? movie.trailerURL
                              .replace("/watch?v=", "/embed/")
                              .concat("/?vq=fhd1080")
                          : ""
                      }
                      frameBorder="0"
                    ></iframe>
                  </div>
                  {/* Movie detail information */}
                  <div
                    className="movie-details"
                    style={{ paddingLeft: 15 + "%", paddingRight: 25 + "%" }}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <div className="movie-details__item movie-details__release-date font-extralight pb-3 text-2xl">
                          {movie.publishYear}
                        </div>
                        <div className="movie-details__item movie-details__item movie-details__title font-bold text-4xl pb-3">
                          <h1>{movie.title}</h1>
                        </div>
                        <div className="movie-details__item movie-details__item movie-details__desc">
                          {movie.description}
                        </div>
                      </div>
                      <div>
                        <div className="movie-details__item movie-details__duration">
                          <b className="font-light">Duration</b>:{" "}
                          {movie.duration}
                        </div>
                        <div className="movie-details__item movie-details__casts">
                          <b className="font-light">Casts</b>: {movie.casts}
                        </div>
                        <div className="movie-details__item movie-details__gerne">
                          {category.map((category) => {
                            return movie.category === category._id ? (
                              <div>{(gerne = category.name)}</div>
                            ) : (
                              <div></div>
                            );
                            
                          })}
                          <b className="font-light">Gerne</b>: {gerne}
                        </div>
                        <div className="movie-details__item movie-details__price">
                          <b className="font-light">Price</b>: {movie.price}$
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-row">
                      <div>
                        <button
                          onClick={() => history.goBack()}
                          className="p-3 ml-10 border-2 bg-black hover:bg-gray-500 border-white text-white"
                        >
                          Back{" "}
                        </button>
                      </div>
                      {/* Add To Cart button */}
                      <div>
                        {localStorage.getItem("accessToken") ? (
                          // Add movie to cart if user logged in
                          <button
                            className="p-3 ml-10 border-2 bg-red-500 hover:bg-red-700 border-white text-white"
                            onClick={() => {
                              handleItemAdd(movie._id);
                            }}
                          >
                            Add to cart
                          </button>
                        ) : (
                          // Redirect to login if not logged in
                          <button
                            className="p-3 ml-10 border-2 bg-red-500 hover:bg-red-700 border-white text-white"
                            onClick={handleOnSubmit}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
