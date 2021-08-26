import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

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

  // Function to handle payment form submit
  const handleSubmit = (e) => {
    // If no error, send input data to backend and redirect to Homepage
    if (!meta.error) {
      e.preventDefault();
      var url = `${BASE_API_URL}/api/v1/orders`
      const data = {  // Data to send to backend
        creditCard: {
          number: cardNumber.replace(/\s+/g, ''),
          expiredDate: formatDate(expDate),
          cvc: cvc.replace(/\s+/g, '')
        }
      }
      let axiosConfig = { // Configuration for axios 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        } 
      }
      // POST method
      axios.post(url, data, axiosConfig)
           .then((res) => console.log(res))
           .catch((err) => console.log(err))
      history.push("/") // Redirect to Homepage 
      alert("Thank you! Please enjoy your movies!") //Display notice
      return;
    }
  }

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

  // Function to transform date format "MM / YY" (card format) to "MM/YYYY" (Backend format)
  const formatDate = (date) => {
    date = date.replace(/\s+/g, '');  // Remove space -> MM/YY
    var splitDate = date.split("/");  // Split into month and year -> [MM], [YY]
    var yearHead = "20";
    var year = yearHead.concat(splitDate[1]); // Add 2000 to year -? [MM], [20YY]
    var formatted = splitDate[0] + "/" + year;  // Rejoin into formatted date -> MM/YYYY
    return formatted;
  }
  
  // Form only need creditcard, total, checkout button 
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
            {/* Page content */}
            <div style={{marginLeft: "25%", marginRight:"25%"}}>
              {/* Payment form */}
              <div className="w-full p-10 bg-gray-700 bg-opacity-25 border-white border-2 border-opacity-75 rounded-md object-center">
                <form onSubmit={handleSubmit}>
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
                        onClick={() => handleItemClear()}
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