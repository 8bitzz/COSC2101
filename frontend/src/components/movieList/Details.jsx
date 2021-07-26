import React from 'react'
import "./movieList.css";
import "./details.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

export default function Details(props) {
  const history = useHistory();

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const _id = props.match.params._id;
    console.log(_id)
    const url = `http://localhost:4000/api/v1/movies/${_id}`;
    axios
      .get(url)
      .then(res => {
        console.log(res)
        setMovie(res.data.data.movie)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <div className="container h-screen w-full mt-40 mx-10 md:object-center">
      <div className="bg-netflix-black overflow-hidden text-white md:object-center">
        <div className="movie-wrapper border">
        <h1 className="mb-10 ml-12 text-3xl font-bold text-white">{movie.title}</h1>
       <button onClick={() => history.goBack()} className="p-3 ml-10 border-2 bg-black border-white text-white">Back </button>
          <div className="movie-img-wrapper">
            <img src={movie.thumbnail} alt="No movie image found" className="md:object-center movie-img-wrapper__thumbnail-img" />
          </div>
          <div className="movie-details">
            <div className="movie-details__item movie-details__item movie-details__desc">
              {movie.description}
            </div>
            <div className="movie-details__item movie-details__release-date">
              <b>Released Date</b>: {movie.publishYear}
            </div>
            <div className="movie-details__item movie-details__duration">
              <b>Duration</b>: {movie.duration}
            </div>
            <div className="movie-details__item movie-details__gerne">
              <b>Actor</b>: {movie.casts}
            </div>
            <div className="movie-details__item movie-details__price">
              <b>Price</b>: {movie.price}
            </div>
          </div>
          <button className="p-3 ml-10 border-2 bg-black border-white text-white">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

