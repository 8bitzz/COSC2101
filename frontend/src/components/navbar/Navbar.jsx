import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar w-screen fixed top-0 z-50 text-white">
      <div className="h-20 py-0 px-12 flex justify-between items-center text-sm">
        <div className="flex items-center font-light">
          <img
            className="h-6 mr-8 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span className="mr-4 cursor-pointer">Home</span>
          <span className="mr-4 cursor-pointer">TV Shows</span>
          <span className="mr-4 cursor-pointer">Movies</span>
          <span className="mr-4 cursor-pointer">New & Popular</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <button className="bg-red-600 rounded-md py-2 px-4">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
