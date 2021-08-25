import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
import FilteredMovieList from "./components/movieList/FilteredMovieList";
import AuthContext from './service/auth-context.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { Fragment} from "react";
import Cart from "./pages/cart/Cart";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import { BASE_API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends React.Component {
  //Set state for accessToken and _id
  state = {
		accessToken: null,
		_id: null,
    count: 0
	}
  //Login function to set current state of accessToken and _id
	login = (accessToken, _id, tokenExpiration) => {
		this.setState({ accessToken: accessToken, _id: _id })
    localStorage.setItem('accessToken', this.state.accessToken)
    localStorage.setItem('_id', this.state._id)
	}
  //Logout function to return the null value of accessToken and _id
	logout = () => {
		this.setState({ accessToken: null, _id: null })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('_id')
	}

  handleItemRemove = (id) => {
    console.log("Item removed");
    console.log(id);
    this.setState({count: this.state.count - 1});
  }

  handleItemAdd = (id) => {
    console.log("Item added");
    console.log(id);
    this.setState({count: this.state.count + 1});
  }

  componentDidMount() {
    const token = localStorage.getItem("accessToken");
    axios
    .get(`${BASE_API_URL}/api/v1/carts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => this.setState({count: res.data.data.carts.length}))
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    console.log(this.state.count)
    return (
      <div className="m-0">
        <Router>
          <Fragment>
            <AuthContext.Provider value={{
              accessToken: this.state.accessToken,
              _id: this.state._id,
              count: this.state.count,
              login: this.login,
              logout: this.logout,
              handleItemRemove: this.handleItemRemove,
              handleItemAdd: this.handleItemAdd
            }} >
              <div className="bg-netflix-black">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/genre"><FilteredMovieList /></Route>
                  <Route path="/search"><SearchMovieList /></Route>
                  <Route path={`/details/:_id`} component={Details} ></Route>
                  {localStorage.getItem('accessToken') && <Redirect from='/signup' to='/' exact />}
                  <Route path="/signup" component={Signup} ></Route>
                  {localStorage.getItem('accessToken') && <Redirect from='/login' to='/' exact />}
                  <Route path="/login" component={Login} ></Route>
                  {!localStorage.getItem('accessToken') && <Redirect from='/cart' to='/' exact />}
                  <Route path="/cart" component={Cart}></Route>
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
