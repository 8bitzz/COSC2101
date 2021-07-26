import Home from "./pages/home/Home";
import Register from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from "./components/movieList/Details";
function App() {
  return (
    <div className="m-0">
      <Router>
          <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route path="" component={Details}></Route>
          </Switch> 
      </Router>
    </div>
  );
}

export default App;
