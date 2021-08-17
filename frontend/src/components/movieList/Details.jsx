import React from 'react'
import "./movieList.css";
import "./details.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import NavBar from '../navbar/NavBar';
import { BASE_API_URL } from '../../utils/constants';
import AuthContext from '../../service/auth-context';
import mongoose from 'mongoose'

export default function Details(props) {
  const history = useHistory();

  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState([]);
  var gerne = '';

  //Get the _id of the movie from props and fectch API to get data of the movie
  useEffect(() => {
    const _id = props.match.params._id;
    const url = `${BASE_API_URL}/api/v1/movies/${_id}`;
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

  const handleCart = (e) => {
    e.preventDefault();
    var mongodb = require('mongodb');
    const movie_id = props.match.params._id;
    var url = `${BASE_API_URL}/api/v1/carts?movie_id=${movie_id}`
    const data = {
      movie:movie_id, 
      createdBy:localStorage.getItem('_id') 
    }
    console.log(data)
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
    axios.post(url, data, axiosConfig)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  //Fetch the categories list in categories API to compare with the value of gerne
  //Result gerne returned in movie API is cateories _id so that we need to fetch category list to compare and get the gerne name for the movie
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
    <div>
      <NavBar />
      <div className=" w-full mt-40 mx-10" style={{ marginLeft: 0 + 'px', marginTop: 0 + 'px' }}>
        <div className="bg-netflix-black overflow-hidden text-white md:object-center">
          <div className="movie-wrapper">
            <div className="trailer-wrapper min-h-full pt-100">
              <iframe height="550px" frameBorder="0" width="100%" allowFullScreen src={
                (movie.trailerURL) ? (movie.trailerURL.replace('/watch?v=', '/embed/').concat("/?vq=fhd1080")) : ('')} frameborder="0"></iframe>
            </div>
            <div className="movie-details" style={{ paddingLeft: 15 + '%', paddingRight: 25 + '%' }}>
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
                    <b className="font-light">Price</b>: {movie.price}$
                  </div>
                </div>
              </div>
              <br />
              <div className="flex flex-row">
                <div>
                  <button onClick={() => history.goBack()} className="p-3 ml-10 border-2 bg-black hover:bg-gray-500 border-white text-white">Back </button>
                </div>
                <div>
                  {localStorage.getItem('accessToken')?
                  (<button className="p-3 ml-10 border-2 bg-red-500 hover:bg-red-700 border-white text-white" onClick={handleCart}>Add to cart</button>):
                  (<button className="p-3 ml-10 border-2   border-white text-white" data-toggle="tooltip" data-placement="top" title="Login to add to cart" disabled>Add to cart</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}

