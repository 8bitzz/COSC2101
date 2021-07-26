import React from 'react'
import { useHistory } from 'react-router-dom';
import Home from '../../pages/home/Home';
export const NavBar = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    let history = useHistory();

    function handleSearch(value){
    setSearch(value)
    if (value === ""){
      history.push("")
    }
    else {
      history.push(`/search=${value}`)
    }
  }

  function handleChange(value){
    setCategory(value)
    if (value === ""){
      history.push("")
    }
    else {
      history.push(`/search=${value}`)
    }
  }
    return (
        <div>
            <div className="navbar w-screen fixed top-0 z-50 text-white">
                <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
                    <div className="flex items-center font-light">
                        <img
                            className="h-6 mr-8 cursor-pointer"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt=""
                        />
                        <select name="category" id="category" class="p-3 ml-10 border-2 bg-black border-white text-white" onChange={event => handleChange(event.target.value)}>
                            <option value="" selected="selected">Genres</option>
                            {
                                movieList.map(ele => (
                                    <option key={ele} >{ele}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex items-center">
                        <div className="search-bar">
                            <div className="growing-search">
                                <div className="input">
                                    <input type="text" name="search" onChange={e => handleSearch(e.target.value)} />
                                </div>
                                <div className="submit">
                                    <button type="submit" name="go_search">
                                        <span className="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-4 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <button className="bg-red-600 rounded-md py-2 px-4">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
