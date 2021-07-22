import "bootstrap/js/src/collapse.js";
import "./styles.css";
import { Link } from "react-router-dom";
import { removeAuthData } from "util/storage";
import history from "util/history";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "AuthContext";
import { getTokenData, isAuthenticated } from "util/auth";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("teste");
    removeAuthData();
    setAuthContextData({ authenticated: false });
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark main-nav">
      <div className="container-fluid button-nav">
        <Link to="/movies" className="nav-logo-text">
          <h1>MovieFlix</h1>
        </Link>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <button
              className="btn btn-primary button-logout"
              onClick={handleLogoutClick}
            >
              Sair
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
