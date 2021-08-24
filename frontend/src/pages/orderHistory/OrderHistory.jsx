import "./orderHistory.css";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import ErrorPopover from "../../components/errorPopover/ErrorPopover";

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
    return <Spinner />;
  }

  return (
    <div className="bg-netflix-black w-full min-h-screen h-full pt-24 text-white">
      <NavBar />
      <div className="h-full w-full m-0 px-12 pb-8">
        {error && <ErrorPopover error={error} />}
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-white text-3xl font-semibold my-6">
              Order History
            </h1>
            {data.orders.length === 0 ? (
              <>
                <h2 className="text-gray-100 text-base mt-6">
                  You haven't placed any orders yet.
                </h2>
                <button className="bg-red-600 rounded-md py-2 px-4 mt-6">
                  <Link to="/cart">Checkout now</Link>
                </button>
              </>
            ) : (
              <h2 className="text-gray-100 text-base my-6">
                {" "}
                Check the status of recent orders and your shipping status.
              </h2>
            )}
          </div>

          {data.orders.map((order) => (
            <div
              className="mt-12 py-8 px-6 order-box w-full sm:w-full md:w-full lg:w-5/12"
              key={order._id}
            >
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h1>Order has been placed successfully!</h1>
                </div>
                <div className="flex flex-row justify-between mb-10">
                  <div>
                    <h1 className="text-lg font-medium text-gray-200">
                      Order No.
                    </h1>
                    <h2 className="text-gray-400 sm:truncate">{order._id}</h2>
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-gray-200">
                      Date placed
                    </h1>
                    <h2 className="text-gray-400">{order.createdAt}</h2>
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-gray-200">
                      Total amount
                    </h1>
                    <h2 className="font-extrabold text-gray-300">
                      $ {order.amount}
                    </h2>
                  </div>
                </div>
                <div className="flow-root">
                  <ul role="list" className="-my-6">
                    {order.movies.map((movie) => (
                      <li key={movie._id} className="py-6 flex">
                        <div className="flex-shrink-0 w-60 h-36 border-0 border-gray-200 rounded-md overflow-hidden">
                          <a href={movie.trailerURL}>
                            <img
                              src={movie.thumbnail}
                              alt={movie.title}
                              className="w-full h-full object-center object-cover"
                            />
                          </a>
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-200">
                              <h3 className="font-bold">{movie.title}</h3>
                              <p className="ml-4 font-medium">
                                $ {movie.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col justify-around text-sm">
                            <div className="flex items-center mt-1 text-gray-400">
                              <span>{movie.duration}</span>
                              <span className="border border-gray-500 px-1 mx-2">
                                16+
                              </span>
                              <span>{movie.publishYear}</span>
                            </div>
                            <div className="text-gray-200">
                              {movie.description}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
