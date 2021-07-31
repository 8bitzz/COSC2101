import React from 'react'
import "./movieList.css";
import "./details.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

export default function Details(props) {
  const history = useHistory();

  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState([]);
  var gerne = '';

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

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/categories`)
      .then((res) => {
        console.log(res)
        setCategory(res.data.data.categories.map((item) => item))
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen w-full mt-40 mx-10 md:object-center" style={{marginLeft:0+'px',marginTop:0+'px'}}>
      <div className="bg-netflix-black overflow-hidden text-white md:object-center">
        <div className="movie-wrapper">
            <div className="trailer-wrapper min-h-full">
            <iframe height = "450px" frameBorder="0" width="100%" allowFullScreen src={
              (movie.trailerURL)?(movie.trailerURL.replace('/watch?v=','/embed/').concat("/?vq=hd1080")) : ('')} frameborder="0"></iframe>
            </div>
          <div className="movie-details">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="movie-details__item movie-details__release-date font-extralight pb-3">
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
                  <b className="font-light">Duration</b>: {movie.duration}
                </div>
                <div className="movie-details__item movie-details__casts">
                  <b className="font-light">Casts</b>: {movie.casts}
                </div>
                <div className="movie-details__item movie-details__gerne">
                  {category.map((category) => {
                    {
                      (movie.category === category._id) ? (
                        <div>
                          {gerne = category.name}
                        </div>
                      ) : (
                        <div>
                        </div>
                      )
                    }
                  })}
                  <b className="font-light">Gerne</b>: {gerne}
                </div>
                <div className="movie-details__item movie-details__price">
                  <b className="font-light">Price</b>: {movie.price}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div>
            <button onClick={() => history.goBack()} className="p-3 ml-10 border-2 bg-black hover:bg-gray-500 border-white text-white">Back </button>
          </div>
          <div>
            <button className="p-3 ml-10 border-2 bg-red-500 hover:bg-red-700 border-white text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

