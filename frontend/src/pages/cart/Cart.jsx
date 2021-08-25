import React from "react"
import NavBar from "../../components/navbar/NavBar"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/constants"
import { Link } from "react-router-dom"

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);   // State to store the list of movies
  const [count, setCount] = useState(0);          // State to count the number of movies
  const [value, setValue] = useState(0);          // Value to trigger fetch function 

  // Fetch movie from cart when Value state change 
  useEffect(() => {
    // Only fetch if user is logged in
    if (localStorage.getItem("accessToken")) {  
      axios
        // Get data from URL 
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          }
        })
        // Store data into states
        .then((res) => {
          setCartItem(res.data.data.carts);
          setCount(res.data.data.carts.length)
          setValue(res.data.data.carts.length)
        })
        // Log error if exists one 
        .catch((err) => {
          console.log(err);
        });
    }
    // Do nothing if no acconut detected
    else {  
      return;
    }
  }, [value]) // useEffect will execute whenever Value state changes

  // Function to remove an item from Cart
  const removeItem = (movieId) => {
    var url = `${BASE_API_URL}/api/v1/carts?movie_id=${movieId}`
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    };
    axios.delete(url, { headers }); // Fetch URL with method DELETE 
  }

  // Function to calculate total price of all movies in Cart 
  const getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var moviePrice = cartItem[i]["movie"]["price"];
      total += moviePrice;
    }
    return total.toFixed(2);
  }

  return (
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{minHeight: "100vh"}}>
      {/* Navbar receives Count state to display number badge on Cart icon */}
      <NavBar count={count}/>  
      {/* Page body */}
      <div className="w-full">
        <h1 className="text-white text-3xl font-semibold text-center my-6">Cart Details</h1>
        {/* Cart container */}
        <div style={{marginLeft: "25%", marginRight:"25%"}}>
          {/* Movie list in Cart */}
          <div 
            className="relative min-w-min h-full border-white border-2 border-opacity-75 rounded-md text-center overflow-auto"
            style={{height: "40rem"}}
          >
            {cartItem.length === 0 ? (
              //Display message if cart is empty
                <div className="relative h-full">
                  <p className="absolute w-full m-0 text-center" style={{top: "50%"}}>Your cart is currently empty</p>
                </div>
              ) : (
                // Display movie information
                <div>
                  {cartItem.map((item, index) => (
                    <div key={index}>
                      <div className="flex">
                        {/* Movie thumnail */}
                        <div className="flex-none">
                          <img
                            src={item.movie.thumbnail}
                            alt=""
                            className="h-36 rounded"
                          />
                        </div>
                        {/* Movie title, publish year and duration */}
                        <div className="flex-grow p-4 text-left">
                          <h1 className="font-semibold text-lg">{item.movie.title}</h1>
                          <p>{item.movie.publishYear}</p>
                          <p>{item.movie.duration}</p>
                        </div>
                        {/* Movie price and remove button */}
                        <div className="flex-grow font-semibold relative p-4 text-right" style={{marginLeft: "auto"}}>
                          <p>${item.movie.price.toFixed(2)}</p>
                          <button className="absolute bottom-4 right-1" onClick={() => {
                            removeItem(item.movie._id);
                            setValue(-1);
                          }}>
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
                                d="M 5 4 L 19 18 M 19 4 L 5 18"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <hr className="my-1 border-opacity-50" />
                    </div>
                  ))}
                </div>
            )}
            
          </div>

          {/* Subtotal */}
          <div className="py-6">
            <p className="px-4 text-lg font-semibold">Subtotal<span style={{ float: "right" }}>${getTotalPrice()}</span></p>
          </div>

          {/* Checkout button links to Checkout page */}
          <div className="mb-10 text-center">
            <Link to="/checkout">
              <button
                className="py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white"
                style={{ width: "24%"}}
              >
                Checkout
              </button>  
            </Link>          
          </div>
        </div>
      </div>
      
    </div>      
  )
}

export default Cart;