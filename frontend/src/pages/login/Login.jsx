import { Link } from "react-router-dom";
import "./login.css";
import { Component, useRef, useState } from "react";
import AuthContext from "../../service/auth-context.js"
import React from "react";
export default class LogIn extends Component {
  static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            message: "",
        }
        this.emailEl = React.createRef()
        this.passwordEl = React.createRef()
    }

  handleSubmit = (e) => {
    e.preventDefault();
    //Get the current value of email and password
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    //Check if email and password are filled
    if (email.trim().length === 0 || email.trim().length === 0) {
      if (email.trim().length === 0) {
        alert('Username must not be empty')
      }
      else if (password.trim().length === 0) {
        alert('Password must not be empty')
      }
      return;
    }
    //Consume auth API
    fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!'),
          this.setState({message: "Wrong username or password"})
        }
        return res.json()
      })
      .then(res => {
        if (res.accessToken) {
          this.context.login(res.accessToken, res._id, res.tokenExpiration)
        }
      })
      .catch(err => {
        console.log(err)
    })
  };
  render(){
    return (
      <div className="login">
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
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <form className="w-1/4 h-2/5 rounded-md bg-netflix-black flex flex-col justify-around p-6 opacity-80">
            <h1 className="text-xl font-semibold text-center">Sign In</h1>
            <input
              className="h-12 rounded-md pl-2 text-gray-600"
              type="email"
              placeholder="Email address"
              ref={this.emailEl}
            />
            <input
              className="h-12 rounded-md pl-2 text-gray-600"
              type="password"
              placeholder="Password"
              ref={this.passwordEl}
            />
            <button
              className="bg-red-600 rounded-md py-2 px-4"
              onClick={this.handleSubmit}
            >
              Sign In
            </button>
            <span>
              New to Netflix?{" "}
              <b>
                <Link to="/signup">Sign Up Now</Link>
              </b>
            </span>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <b>
                <a className="z-10 cursor-pointer">Learn more</a>
              </b>
              .
            </small>
          </form>
        </div>
      </div>
    );

  }
    
};

