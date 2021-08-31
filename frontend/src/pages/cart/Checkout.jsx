import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { usePaymentInputs } from "react-payment-inputs";
import AuthContext from "../../service/auth-context";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

  // Fetch movie from cart
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        // Fetch from URL with GET method and headers
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          }
        })
        // Store data in states
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
  }, []);

  // Function to get total price of all items in cart 
  const getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var moviePrice = cartItem[i]["movie"]["price"];
      total += moviePrice;
    }
    return total.toFixed(2);
  }

  // Functions to handle user input to payment form
  const handleCardNumberInput = (e) => {
    setCardNumber(e.target.value);
  }

  const handleExpDateInput = (e) => {
    setExpDate(e.target.value);
  }

  const handleCvcInput = (e) => {
    setCvc(e.target.value)
  }
  
  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleItemClear = context.handleItemClear;
        return(
          <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{ minHeight: "100vh" }}>
            {/* Navbar */}
            <NavBar/>
            {/* Page title */}
            <h1 className="text-white text-3xl font-semibold text-center my-6">Checkout</h1>
            <img 
              className="h-10 m-auto mb-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1920px-Visa_2021.svg.png" 
              alt="Visa card logo" 
            />
            {/* Page content */}
            <div style={{marginLeft: "25%", marginRight:"25%"}}>
              {/* Payment form */}
              <div className="w-full p-10 bg-gray-700 bg-opacity-25 border-white border-2 border-opacity-75 rounded-md object-center">
                <form onSubmit={(e) => handleItemClear(e, cardNumber, expDate, cvc)}>
                  {/* Card number field */}
                  <div>
                    <input 
                      {...getCardNumberProps({ onChange: handleCardNumberInput })} 
                      className="w-full h-10 p-4 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                    />
                  </div>
                  {/* Expiry date and CVC field */}
                  <div className="my-8 flex gap-2">
                    {/* Expiry Date */}
                    <div className="flex-grow min-w-min">
                      <input 
                        {...getExpiryDateProps({ onChange: handleExpDateInput })} 
                        className="w-full h-10 p-4 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                      />
                    </div>
                    {/* CVC */}
                    <div className="flex-shrink min-w-min">
                      <input 
                        {...getCVCProps({ onChange: handleCvcInput })} 
                        className="w-full h-10 p-4 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {meta.isTouched && meta.error && <span className="text-red-500">Error: {meta.error}</span>}

                  {/* Total price */}
                  <div className="mt-4 mb-8">
                    <p className="mb-2 text-2xl font-semibold">Total<span style={{ float: "right" }}>${getTotalPrice()}</span></p>
                    <hr/>
                  </div>

                  {/* Submit button behaviours */}
                  <div className="text-center">
                    {/* Show Submit button if no error */}
                    {!meta.error &&
                      <input 
                        type="submit" 
                        value="Pay now" 
                        className="min-w-max mt-4 py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white bg-netflix-black"
                        style={{ width: "24%", margin: "auto"}}
                      />
                    }

                    {/* Show disabled button otherwise */}
                    {!meta.isTouched && meta.error &&
                      <div 
                        className="min-w-max mt-8 py-1.5 px-3 min-w-min border-white border-2 border-opacity-50 rounded-md text-gray-500 text-center bg-netflix-black"
                        style={{ width: "24%", margin: "auto"}}
                      >
                        Pay now
                      </div>
                    }
                    {meta.isTouched && meta.error &&
                      <div 
                      className="min-w-max mt-8 py-1.5 px-3 min-w-min border-white border-2 border-opacity-50 rounded-md text-gray-500 text-center bg-netflix-black"
                      style={{ width: "24%", margin: "auto"}}
                    >
                      Pay now
                    </div>
                    }
          
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  )
}

export default Checkout;