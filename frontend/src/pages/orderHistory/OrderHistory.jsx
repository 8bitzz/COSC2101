import "./orderHistory.css";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/constants";
import { useHistory } from "react-router-dom";

const orderFetcher = (url, token) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.data);

const OrderHistory = () => {
  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    history.push("/login");
  }

  const { data, error } = useSWR(
    [`${BASE_API_URL}/api/v1/orders`, token],
    orderFetcher
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
    <div className="bg-netflix-black w-full h-full pt-24 text-white">
      <NavBar />
      <div className="h-screen w-full m-0 px-12">
        <div className="">
          <h1 className="text-white text-3xl font-semibold my-6">
            Order History
          </h1>
          <h2 className="text-gray-100 text-base my-6">
            {" "}
            Check the status of recent orders and your shipping status.
          </h2>
        </div>
        <div className="mt-8">
          <div className="flow-root lg:w-5/12">
            <ul role="list" className="-my-6 divide-y divide-gray-900">
              {data.orders[0].movies.map((movie) => (
                <li key={movie._id} className="py-6 flex">
                  <div className="flex-shrink-0 w-60 h-36 border-0 border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-xl font-bold text-gray-50">
                        <h3>
                          <a href={movie.trailerURL}>{movie.title}</a>
                        </h3>
                        <p className="ml-4 text-xl">$ {movie.price}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-sm">
                      <div className="flex items-center my-2">
                        <span>{movie.duration}</span>
                        <span className="limit">{movie.duration}</span>
                        <span>{movie.publishYear}</span>
                      </div>
                      <div className="desc">{movie.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
