import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
import FilteredMovieList from "./components/movieList/FilteredMovieList";
import AuthContext from "./service/auth-context.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { Fragment } from "react";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import { BASE_API_URL } from "./utils/constants";
import axios from "axios";
import { formatCardDate } from "./utils/utils";

export default class App extends React.Component {
  // Set state for accessToken and _id
  state = {
    accessToken: null,
    _id: null,
    count: 0,
  };

  // Login function to set current state of accessToken and _id
  login = (accessToken, _id, tokenExpiration) => {
    this.setState({ accessToken: accessToken, _id: _id });
    localStorage.setItem("accessToken", this.state.accessToken);
    localStorage.setItem("_id", this.state._id);
  };

  // Logout function to return the null value of accessToken and _id
  logout = () => {
    this.setState({ accessToken: null, _id: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("_id");
  };

  // Handle cart item count when remove
  handleItemRemove = (id) => {
    console.log("Item removed");
    console.log(id);
    const token = localStorage.getItem("accessToken");
    // DELETE method and update count state 
    axios
      .delete(`${BASE_API_URL}/api/v1/carts?movie_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ count: this.state.count - 1 });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle cart item count when reset cart
  handleItemClear = (e, cardNumber, expDate, cvc) => {
    e.preventDefault();
    // Prepare fetch url, data and configuration
    const url = `${BASE_API_URL}/api/v1/orders`;
    const data = {
      creditCard: {
        number: cardNumber.replace(/\s+/g, ''),
        expiredDate: formatCardDate(expDate),
        cvc: cvc.replace(/\s+/g, '')
      }
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
    // Fetch backend with POST method 
    axios
      .post(url, data, axiosConfig)
      .then((res) => {
        console.log(res);
        this.setState({count: 0});
        alert("Thank you! Please enjoy your movies!") //Display notice
        console.log("Reset cart")
        window.history.pushState({},"", "/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
    // Alert and redirect to Homepage 
    
  }

  // Handle cart item count when adding an item 
  handleItemAdd = (id) => {
    const token = localStorage.getItem("accessToken");
    const userID = localStorage.getItem("_id");
    const data = {
      movie: id,
      createdBy: userID,
    };
    // POST method and update count state 
    axios
      .post(`${BASE_API_URL}/api/v1/carts?movie_id=${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ count: this.state.count + 1 });
          console.log("Item added");
          console.log(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch database when component mount
  componentDidMount() {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${BASE_API_URL}/api/v1/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ count: res.data.data.carts.length }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="m-0">
        <Router>
          <Fragment>
            <AuthContext.Provider
              value={{
                accessToken: this.state.accessToken,
                _id: this.state._id,
                count: this.state.count,
                login: this.login,
                logout: this.logout,
                handleItemRemove: this.handleItemRemove,
                handleItemAdd: this.handleItemAdd,
                handleItemClear: this.handleItemClear
              }}
            >
              <div className="bg-netflix-black">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/genre">
                    <FilteredMovieList />
                  </Route>
                  <Route path="/search">
                    <SearchMovieList />
                  </Route>
                  <Route path={`/details/:_id`} component={Details}></Route>
                  {localStorage.getItem("accessToken") && (
                    <Redirect from="/signup" to="/" exact />
                  )}
                  <Route path="/signup" component={Signup}></Route>
                  {localStorage.getItem("accessToken") && (
                    <Redirect from="/login" to="/" exact />
                  )}
                  <Route path="/login" component={Login}></Route>
                  {!localStorage.getItem("accessToken") && (
                    <Redirect from="/cart" to="/" exact />
                  )}
                  <Route path="/cart" component={Cart}></Route>
                  {!localStorage.getItem("accessToken") && <Redirect from="/checkout" to="/" exact/>}
                  <Route path="/checkout" component={Checkout}></Route>
                  <Route path="/user/order" component={OrderHistory}></Route>
                </Switch>
              </div>
            </AuthContext.Provider>
          </Fragment>
        </Router>
      </div>
    );
  }
}
