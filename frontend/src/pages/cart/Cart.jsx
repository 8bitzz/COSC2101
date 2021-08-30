import React from "react";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/constants";
import AuthContext from "../../service/auth-context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  let history = useHistory();

  // Fetch movie from cart
  useEffect(() => {
    // Only fetch if user is logged in
    if (localStorage.getItem("accessToken")) {  
      axios
        // Get data from URL 
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        // Store data into states
        .then((res) => {
          setCartItem(res.data.data.carts);
        })
        // Log error if exists one 
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }, []);

  // Function to calculate total price of all movies in Cart 
  const getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var moviePrice = cartItem[i]["movie"]["price"];
      total += moviePrice;
    }
    return total.toFixed(2);
  };

  // Exclude removed item from the Cart
  const filterCartItems = removedItem => {
    const newCartItems = cartItem.filter(
      item => item.movie._id !== removedItem.movie._id
    );
    setCartItem(newCartItems);
  }

  // Redirect to Home
  const redirectToHome = () => {
    alert(
      "Your cart is empty!\n" +
      "Want to browse for something?"
    )
    history.push("/")
    return;
  }

  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleItemRemove = context.handleItemRemove;
        return (
          <div
            className="bg-netflix-black bg-cover w-full py-24 text-white"
            style={{ minHeight: "100vh" }}
          >
            <NavBar />
            <div className="w-full">
              <h1 className="text-white text-3xl font-semibold text-center my-6">
                Cart Details
              </h1>
              <div style={{ marginLeft: "25%", marginRight: "25%" }}>
                <div
                  className="relative min-w-min h-full border-white border-2 border-opacity-75 rounded-md text-center overflow-auto"
                  style={{ height: "40rem" }}
                >
                  {/* Cart content */}
                  {cartItem.length === 0 ? (
                    // Message when cart is empty 
                    <div className="relative h-full">
                      <p
                        className="absolute w-full m-0 text-center"
                        style={{ top: "50%" }}
                      >
                        Your cart is currently empty
                      </p>
                    </div>
                  ) : (
                    // List out items in cart
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
                              <h1 className="font-semibold text-lg">
                                {item.movie.title}
                              </h1>
                              <p>{item.movie.publishYear}</p>
                              <p>{item.movie.duration}</p>
                            </div>
                            <div
                              className="flex-grow font-semibold relative p-4 text-right"
                              style={{ marginLeft: "auto" }}
                            >
                              <p>${item.movie.price.toFixed(2)}</p>
                              {/* Remove button */}
                              <button
                                className="absolute bottom-4 right-1"
                                onClick={() => {
                                  handleItemRemove(item.movie._id);
                                  filterCartItems(item);
                                }}
                              >
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
                  <p className="px-4 text-lg font-semibold">
                    Subtotal
                    <span style={{ float: "right" }}>${getTotalPrice()}</span>
                  </p>
                </div>

                {/* Button to checkout */}
                <div className="mb-10 ">
                  {(cartItem.length !== 0) && (
                    <Link to="/checkout">
                      <button
                        className="py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white"
                        style={{
                          width: "24%",
                          marginLeft: "38%",
                          marginRight: "38%",
                        }}
                      >
                        Checkout
                      </button>
                    </Link>
                  )}

                  {(cartItem.length === 0) && (
                    // Button redirecting to Homepage if cart is empty
                    <button
                      className="py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white"
                      style={{
                        width: "24%",
                        marginLeft: "38%",
                        marginRight: "38%",
                      }}
                      onClick={redirectToHome}
                    >
                      Checkout
                    </button>
                  )}    
                  
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Cart;
