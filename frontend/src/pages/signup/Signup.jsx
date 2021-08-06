import { useRef, useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import AuthContext from "../../service/auth-context.js"
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Check if email and password are filled
       if (email.trim().length === 0 || password.trim().length === 0) {
      if (email.trim().length === 0) {
        alert('Email must not be empty')
      }
      else if (password.trim().length === 0) {
        alert('Password must not be empty')
      }
      return;
    }
    //Consume auth API
    const token = AuthContext.accessToken //Get token from AuthContext
    var url = 'http://localhost:4000/api/v1/auth/register'
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(res => {
        if (res.status === 409) {
          throw new Error('Email already existed'),
          alert('Email already existed')
        } else {
          alert('User added!')
        }
      })
  };
  return (
    <div className="register">
        <div className="navbar w-screen fixed top-0 z-50 text-white">
          <div className="h-20 py-3 px-12 flex justify-between items-center text-sm">
            <div className="flex items-center font-light">
              <Link to="/">
                <img
                  className="h-6 mr-8 cursor-pointer"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button className="bg-red-600 rounded-md py-2 px-4">
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="text-5xl font-extrabold">Unlimited movies, TV shows, and more.</h1>
          <h2 className="text-3xl my-4 font-bold">Watch anywhere. Cancel anytime.</h2>
          <p className="text-xl mb-4">
            Ready to watch? Enter your email to start checking out your cart.
          </p>
          <form className="w-1/4 h-2/5 rounded-md bg-netflix-black flex flex-col justify-around p-6 opacity-80" action="post">
            <h1 className="text-xl font-semibold text-center">Sign Up</h1>
            <input className="h-12 rounded-md pl-2 text-gray-600" type="text" id="username" name="username" value={username} placeholder="Username" onChange={e=>setUsername(e.target.value)} />
            <input className="h-12 rounded-md pl-2 text-gray-600" type="text" id="email" name="email" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="h-12 rounded-md pl-2 text-gray-600" id="password" name="password" value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <button
              className=" bg-red-600 rounded-md py-2 px-4 "
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
  );
}