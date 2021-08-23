import "./orderHistory.css";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/constants";
import { useHistory } from "react-router-dom";

const fetcher = (url, token) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.data);

const OrderHistory = () => {
  const history = useHistory();
  const token = localStorage.getItem("accessToken");
  const { data, error } = useSWR(
    [`${BASE_API_URL}/api/v1/carts`, token],
    fetcher
  );

  if (!data) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-white">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    );
  }

  if (error) {
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5">
      <span className="inline-block align-middle mr-8">
        <b className="font-bold">Error!</b> {error}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => {
          history.push("/");
        }}
      >
        <span>×</span>
      </button>
    </div>;
  }

  return (
    <div className="bg-netflix-black  w-full h-full pt-24 text-white">
      <NavBar count={data.carts.length} />
      <div className="h-screen w-full m-0">
        <h1 className="text-white text-3xl font-semibold text-center my-6">
          Order History
        </h1>
      </div>
    </div>
  );
};

export default OrderHistory;
