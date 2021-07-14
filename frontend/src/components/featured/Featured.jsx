import './featured.css'

const Featured = ({ type }) => {
  return (
    <div className="featured relative ">
      <img
        src="https://images.unsplash.com/photo-1625327207808-69be4e623a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2750&q=80"
        alt=""
        className="w-full h-full object-cover opacity-80"
      />
      <div className="w-2/5 absolute inset-x-14 bottom-14 flex flex-col text-white">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
          className="w-5/6 justify-center"
        />
        <span className="my-6 text-xl font-medium drop-shadow-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
        </span>
        <div className="flex items-center">
          <button className="flex items-center bg-gray-50 text-netflix-black cursor-pointer font-medium text-xl rounded-md py-3 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3">Play</span>
          </button>
          <button className="flex items-center bg-gray-400 text-white cursor-pointer font-medium text-xl rounded-md ml-3 py-3 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-3">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
