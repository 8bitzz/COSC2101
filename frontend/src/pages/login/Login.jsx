import { Link } from "react-router-dom";
import "./login.css";

const LogIn = () => {
  return (
    <div className="login">
      <div className="navbar w-screen fixed top-0 z-50 text-white">
        <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
          <div className="flex items-center font-light">
            <img
              className="h-6 mr-8 cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </div>
          <div className="flex items-center">
            <button className="bg-red-600 rounded-md py-2 px-4">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <form className="w-1/4 h-2/5 rounded-md bg-netflix-black flex flex-col justify-around p-4 opacity-80">
          <h1 className="text-xl font-semibold text-center">Sign In</h1>
          <input className="h-12 rounded-md pl-2" type="email" placeholder="Email address"/>
          <input className="h-12 rounded-md pl-2" type="password" placeholder="Password" />
          <button className="bg-red-600 rounded-md py-2 px-4">Sign In</button>
          <span>New to Netflix? <b><Link to="/signup">Sign Up Now</Link></b></span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b><a className="z-10 cursor-pointer">Learn more</a></b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default LogIn;