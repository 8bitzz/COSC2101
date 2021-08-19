import React from "react"
import NavBar from "../../components/navbar/NavBar"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/constants"

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      return;
    }
  }, [cartItem])

  const getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var moviePrice = cartItem[i]["movie"]["price"];
      total += moviePrice;
    }
    return total;
  }

  return (
    <div className="bg-netflix-black h-screen w-full mt-24 text-white object-center">
      <NavBar/>
      <h1 className="text-white text-3xl font-semibold text-center my-6">Cart Details</h1>
      <div className="mx-96">
        <div 
          className="border-white border-2 border-opacity-75 rounded-md text-center overflow-auto"
          style={{height: "30rem"}}
        >
          {cartItem.map((item, index) => (
            <div>
              <div key={index} className="grid grid-cols-3">
                <div>
                  <img
                    src={item.movie.thumbnail}
                    alt=""
                    className="h-36 rounded"
                  />
                </div>
                <div className="p-4 text-left">
                  <h1 className="font-semibold text-lg">{item.movie.title}</h1>
                  <p>{item.movie.publishYear}</p>
                  <p>{item.movie.duration}</p>
                </div>
                <div className=" font-semibold relative p-4 text-right">
                  <p>{item.movie.price}</p>
                  <button className="absolute bottom-4 right-1">
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
              <hr className="my-1 border-opacity-50"/>
            </div>
          ))}
        </div>
        <div className="py-6">
          <p className="px-4 text-lg font-semibold">Subtotal<span style={{float: "right"}}>{getTotalPrice()}</span></p>
        </div>
        <button 
          className="py-1.5 px-3 border-white border-2 border-opacity-75 rounded-md text-white"
          style={{width: "24%", marginLeft: "38%", marginRight: "38%"}}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart;