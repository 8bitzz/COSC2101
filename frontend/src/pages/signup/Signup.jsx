import { useRef, useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailChange = () => {
    setEmail(emailRef.current.value);
  };
  const handleSubmit = () => {
    // Consume authen API
  };
  return (
    <div className="register">
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
          <button className="bg-red-600 rounded-md py-2 px-4"><Link to="/login">Sign In</Link></button>
        </div>
      </div>
    </div>
      <div className="container">
        <h1 className="text-5xl">Unlimited movies, TV shows, and more.</h1>
        <h2 className="text-3xl my-4">Watch anywhere. Cancel anytime.</h2>
        <p className="text-xl mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input className="w-4/5 h-full border-none p-3 text-gray-600" type="email" placeholder="Email address" ref={emailRef}/>
            <button className="w-1/5 bg-red-600 py-2 px-4 h-full" onClick={handleEmailChange}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input className="w-4/5 h-full border-none p-3 text-gray-600" type="password" placeholder="Password" ref={passwordRef} onChange={() => setPassword(passwordRef.current.value)}/>
            <button className="w-1/5 bg-red-600 py-2 px-4 h-full" onClick={handleSubmit}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}