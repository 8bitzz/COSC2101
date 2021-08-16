import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
import FilteredMovieList from "./components/movieList/FilteredMovieList";
import AuthContext from './service/auth-context.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { Fragment} from "react";

export default class App extends React.Component {
  //Set state for accessToken and _id
  state = {
		accessToken: null,
		_id: null
	}
  //Login function to set current state of accessToken and _id
	login = (accessToken, _id, tokenExpiration) => {
		this.setState({ accessToken: accessToken, _id: _id })
    localStorage.setItem('accessToken', this.state.accessToken)
	}
  //Logout function to return the null value of accessToken and _id
	logout = () => {
		this.setState({ accessToken: null, _id: null })
    localStorage.removeItem('accessToken')
	}
  render() {
    return (
      <div className="m-0">
        <Router>
          <Fragment>
            <AuthContext.Provider value={{
              accessToken: this.state.accessToken,
              _id: this.state._id,
              login: this.login,
              logout: this.logout
            }} >
              <div className="bg-netflix-black overflow-hidden">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/genre"><FilteredMovieList /></Route>
                  <Route path="/search"><SearchMovieList /></Route>
                  <Route path={`/details/:_id`} component={Details} ></Route>
                  <Route path="/signup" component={Signup} ></Route>
                  {localStorage.getItem('accessToken') && <Redirect from='/login' to='/' exact />}
                  <Route path="/login" component={Login} ></Route>
                </Switch>
              </div>
            </AuthContext.Provider>
          </Fragment>
        </Router>
      </div>
    );
  }

}
