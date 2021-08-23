import React from "react"
import NavBar from "../../components/navbar/NavBar"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/constants"

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  // Fetch movie from cart
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          }
        })
        .then((res) => {
          setCartItem(res.data.data.carts);
          setCount(res.data.data.carts.length)
          setValue(res.data.data.carts.length)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      return;
    }
  }, [value])

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
      <NavBar count={count}/>
      <div className="w-full">
        <h1 className="text-white text-3xl font-semibold text-center my-6">Cart Details</h1>
        <div style={{marginLeft: "25%", marginRight:"25%"}}>
          <div 
            className="relative min-w-min h-full border-white border-2 border-opacity-75 rounded-md text-center overflow-auto"
            style={{height: "40rem"}}
          >
            {cartItem.length === 0 ? (
                <div className="relative h-full">
                  <p className="absolute w-full m-0 text-center" style={{top: "50%"}}>Your cart is currently empty</p>
                </div>
              ) : (
                <div>
                  {cartItem.map((item, index) => (
                    <div key={index}>
                      <div className="flex">
                        <div className="flex-none">
                          <img
                            src={item.movie.thumbnail}
                            alt=""
                            className="h-36 rounded"
                          />
                        </div>
                        <div className="flex-grow p-4 text-left">
                          <h1 className="font-semibold text-lg">{item.movie.title}</h1>
                          <p>{item.movie.publishYear}</p>
                          <p>{item.movie.duration}</p>
                        </div>
                        <div className="flex-grow font-semibold relative p-4 text-right" style={{marginLeft: "auto"}}>
                          <p>${item.movie.price.toFixed(2)}</p>
                          <button className="absolute bottom-4 right-1" onClick={() => {
                            var url = `${BASE_API_URL}/api/v1/carts?movie_id=${item.movie._id}`
                            const headers = {
                              'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                            };
                            axios.delete(url, { headers });
                            setValue(0)
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
          <div className="py-6">
            <p className="px-4 text-lg font-semibold">Subtotal<span style={{ float: "right" }}>${getTotalPrice()}</span></p>
          </div>
          <div className="mb-10 ">
            <button
              className="py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white"
              style={{ width: "24%", marginLeft: "38%", marginRight: "38%" }}
            >
              Checkout
            </button>            
          </div>
        </div>
      </div>
      
    </div>      
  )
}

export default Cart;