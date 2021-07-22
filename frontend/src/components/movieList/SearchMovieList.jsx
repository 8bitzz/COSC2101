import { useEffect, useState, useRef } from "react";
import MovieItem from "../movieItem/MovieItem";
import axios from 'axios';
import "./movieList.css";

const SearchMovieList = ({ search }) => {
    const [filteredmovies, setFilteredMovie] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/v1/movies?name=${search}`)
            .then(res => {
                console.log(res)
                setFilteredMovie(res.data.data.movies)
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [search])
    console.log(filteredmovies)

    return (
        <div className="w-full mt-10">
            {(filteredmovies.length <= 0) ? (
                <div className = "text-white">
                    <p >There is no matching movie</p>
                </div>
            ) : (
                <div>
                    {filteredmovies.map((movie, index) => {
                        return (
                            <div>
                                <img
                                    src={movie.thumbnail}
                                    alt=""
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    );
}

export default SearchMovieList