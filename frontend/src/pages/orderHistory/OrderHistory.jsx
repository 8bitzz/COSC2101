import React from "react";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../utils/constants"
import { useHistory } from "react-router-dom";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);
  const [orderItem, setOrderItem] = useState([])
  const [count, setCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history.push("/login");
    }

    axios
        .get(`${BASE_API_URL}/api/v1/carts`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        })
        .then((res) => {
          setCount(res.data.data.carts.length)
        })
        .catch((err) => {
          console.log(err);
        });

  },[]);

  return (
    <div className="bg-netflix-black  w-full h-full pt-24 text-white">
      <NavBar count={count}/>
      <div className="h-screen w-full m-0">
        <h1 className="text-white text-3xl font-semibold text-center my-6">
          Order History
        </h1>
      </div>
    </div>
  );
};

export default OrderHistory;
