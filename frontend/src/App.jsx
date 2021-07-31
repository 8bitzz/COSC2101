import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
import FilteredMovieList from "./components/movieList/FilteredMovieList";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="m-0">
      <Router>
        <div className="bg-netflix-black overflow-hidden">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/genre"><FilteredMovieList/></Route>
            <Route path="/search"><SearchMovieList/></Route>
            <Route path={`/details/:_id`} component={Details} ></Route>
            <Route path="/signup" component={Signup} ></Route>
            <Route path="/login" component={Login} ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
