import Navbar from "components/Navbar";
import Home from "pages/Home";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Movies from "pages/Movies";
import MovieDetails from "pages/MovieDetails";
import history from "util/history";
import { isAuthenticated } from "util/auth";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {isAuthenticated() ? (
          <Route exact path="/movies">
            <Movies />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
        ;
        {isAuthenticated() ? (
          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
