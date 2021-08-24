import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [count, setCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  // Fetch movie from cart
  useEffect(() => {
    console.log("Checkout Cart")
    if (localStorage.getItem("accessToken")) {
      axios
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          }
        })
        .then((res) => {
          setCartItem(res.data.data.carts);
          setCount(res.data.data.carts.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      return;
    }
  }, [])

  const getTotalPrice = () => {
    var total = 0;
    for (var i = 0; i < cartItem.length; i++) {
      var moviePrice = cartItem[i]["movie"]["price"];
      total += moviePrice;
    }
    return total.toFixed(2);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    var url = `${BASE_API_URL}/api/v1/orders`
    const data = {
      creditCard: {
        number: cardNumber,
        expiredDate: expDate,
        cvc: cvc
      },
      createdBy: localStorage.getItem("_id"),
      amount: getTotalPrice(),
      movies: cartItem
    }
    console.log(data)
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      } 
    }
    axios.post(url, data, axiosConfig)
    return setCount(0)
  }

  const handleCardNumberInput = (e) => {
    setCardNumber(e.target.value);
  }

  const handleExpDateInput = (e) => {
    setExpDate(e.target.value);
  }

  const handleCvcInput = (e) => {
    setCvc(e.target.value)
  }
  
  // Form only need creditcard, total, checkout button 
  return (
    <div className="bg-netflix-black bg-cover w-full py-24 text-white" style={{ minHeight: "100vh" }}>
      <NavBar count={count}/>
      <h1 className="text-white text-3xl font-semibold text-center my-6">Checkout</h1>
      <div style={{marginLeft: "25%", marginRight:"25%"}}>
        <div className="relative w-full p-10 bg-gray-700 bg-opacity-25 border-white border-2 border-opacity-75 rounded-md object-center">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div>
              <label>Card Number</label>
              <div>
                <input 
                  type="text" 
                  className="w-full h-10 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                  onChange={handleCardNumberInput}
                />
              </div>
            </div>
            <div className="my-8 flex gap-2">
              <div className="flex-grow">
                <label>Expiration Date</label>
                <div>
                  <input 
                    type="text" 
                    className="w-full h-10 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                    onChange={handleExpDateInput}
                  />
                </div>
              </div>
              <div className="flex-none w-40">
                <label>CVC</label>
                <div>
                  <input 
                    type="text" 
                    className="w-full h-10 border-white border-2 border-opacity-75 rounded-md bg-netflix-black"
                    onChange={handleCvcInput}
                    />                  
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-2xl font-semibold">Total<span style={{ float: "right" }}>${getTotalPrice()}</span></p>
              <hr/>
            </div>

            <div>
              <input 
                type="submit" 
                value="Pay now" 
                className="mt-4 py-1.5 px-3 min-w-min border-white border-2 border-opacity-75 rounded-md text-white bg-netflix-black"
                style={{ width: "24%", marginLeft: "38%", marginRight: "38%" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout;