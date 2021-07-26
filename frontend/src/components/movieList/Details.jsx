import React from 'react'
import "./movieList.css";
import "./details.css";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Details(props) {
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
    <div className="bg-netflix-black overflow-hidden text-white">
      <div className="movie-wrapper">
        <div className="movie-wrapper-top">
          <div className="movie-wrapper__title ">
            <h1>{movie.title}</h1>
          </div>
        </div>
        <div className="movie-img-wrapper">
          <img src={movie.thumbnail} alt="No movie image found" className="movie-img-wrapper__thumbnail-img" />
        </div>
        <div className="movie-details">
          <div className="movie-details__item movie-details__item movie-details__desc">
            {movie.description}
          </div>
          <div className="movie-details__item movie-details__release-date">
            <b>Released Date</b>: {movie.publishYear}
          </div>
          <div className="movie-details__item movie-details__duration">
            <b>Duration</b>: {movie.duration} minutes
          </div>
          <div className="movie-details__item movie-details__gerne">
            <b>Price</b>: {movie.genre}
          </div>
          <div className="movie-details__item movie-details__price">
            <b>Price</b>: {movie.price}
          </div>
        </div>
        <button>Add to cart</button>
      </div>
    </div>
  )
}