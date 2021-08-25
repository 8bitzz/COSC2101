import { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import AuthContext from "../../service/auth-context.js";
export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      username.trim().length === 0
    ) {
      if (username.trim().length === 0) {
        setMessage("Username must not be empty");
      } else if (email.trim().length === 0) {
        setMessage("Email must not be empty");
      } else if (password.trim().length === 0) {
        setMessage("Password must not be empty");
      }
      return;
    }
    const token = AuthContext.accessToken; //Get token from AuthContext
    var email_regex =
    /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (!email.match(email_regex)) {
      setMessage("Please input a valid email");
      setDisable(false)
    } else if (!password.match(/(?=.*\d)(?=.*[A-Z]).{6,}/)) {
      setMessage(
        "Password must be at least 6 characters long, must contain a number, must contain an uppercase"
      );
      setDisable(false)
    } else {
      if(disable){
        return;
      }
      setDisable(true);
      //Consume auth API
      var url = "http://localhost:4000/api/v1/auth/register";
      await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            setMessage("Email has been registered")
            setDisable(false)
            throw (
              (new Error("Email already existed"))
            );
          } else if (res.status === 200 || res.status === 201){
            setMessage("");
            var ask = window.confirm("User added! \nClick OK to go back to Log in page");
            if (ask) {
              history.push('/login')
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <h1 className="text-5xl font-extrabold">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-3xl my-4 font-bold">
          Watch anywhere. Cancel anytime.
        </h2>
        <p className="text-xl mb-4">
          Ready to watch? Enter your email to start checking out your cart.
        </p>
        <form
          className="w-1/4 h-2/5 rounded-md bg-netflix-black flex flex-col justify-around p-6 opacity-100"
          action="post"
        >
          <h1 className="text-xl font-semibold text-center">Sign Up</h1>
         
          <input
            className="h-12 rounded-md pl-2 text-gray-600"
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="h-12 rounded-md pl-2 text-gray-600"
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="h-12 rounded-md pl-2 text-gray-600"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className=" bg-red-600 rounded-md py-2 px-4 "
            onClick={handleSubmit}
          >
            {disable?'Signing up...':'Register'}
          </button>
        </form>
        <div style = {{border:"100px"}}>
            <p style={{ color: "red" }}>{message}</p>
          </div>
      </div>
    </div>
  );
}
