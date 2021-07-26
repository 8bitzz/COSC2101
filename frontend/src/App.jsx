import Home from "./pages/home/Home";
import Register from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from "./components/movieList/Details";
import SearchMovieList from "./components/movieList/SearchMovieList";
function App() {
  return (
    <div className="m-0">
      <Router>
          <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route path={`/details/:_id`} component={Details}></Route>
            {/* <Route path={`/search?keyword=:title`} component={SearchMovieList}></Route> */}
          </Switch> 
      </Router>
    </div>
  );
}

export default App;
