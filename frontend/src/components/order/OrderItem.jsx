import React from "react";

const OrderItem = ({movie}) => {
  return (
    <>
      <li className="py-6 flex">
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
              <p className="ml-4 font-medium">$ {movie.price}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-start text-sm">
            <div className="flex items-center my-2 text-gray-400">
              <span>{movie.duration}</span>
              <span className="border border-gray-500 px-1 mx-2">16+</span>
              <span>{movie.publishYear}</span>
            </div>
            <div className="text-gray-200">{movie.description}</div>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderItem;
