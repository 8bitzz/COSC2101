import React from "react";
import OrderItem from "./OrderItem";

const OrderCard = ({ order }) => {
  return (
    <>
      <div
        className="mt-12 py-8 px-6 order-box w-full sm:w-full md:w-full lg:w-6/12"
        key={order._id}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-start items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1>Order has been placed successfully!</h1>
          </div>
          <div className="flex flex-row justify-between mb-10">
            <div>
              <h1 className="text-lg font-medium text-gray-200">Order No.</h1>
              <h2 className="text-gray-400 sm:truncate">{order._id}</h2>
            </div>
            <div>
              <h1 className="text-lg font-medium text-gray-200">Date placed</h1>
              <h2 className="text-gray-400">{order.createdAt}</h2>
            </div>
            <div>
              <h1 className="text-lg font-medium text-gray-200">
                Total amount
              </h1>
              <h2 className="font-extrabold text-gray-300">$ {order.amount}</h2>
            </div>
          </div>
          <div className="flow-root">
            <ul role="list" className="-my-6">
              {order.movies.map((item) => (
                <OrderItem key={item._id} movie={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
