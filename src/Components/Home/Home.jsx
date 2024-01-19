import "./Home.css";
import { Link, Outlet, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  return (
    <>
      <div id="navbar">
        {location.pathname.match("/Dashboard") ? (
          <p>
            <Link to="/Dashboard" className="reactLink">
              JSR BANK
            </Link>
          </p>
        ) : (
          <p>
            <Link to="/" className="reactLink">
              JSR BANK
            </Link>
          </p>
        )}
        {location.pathname === "/" ? (
          <p>
            <Link to="/SignIn" className="reactLink">
              LOGIN/SIGNUP
            </Link>
          </p>
        ) : null}
        {location.pathname.match("/Dashboard") ? (
          <p>
            <Link to="/" className="reactLink">
              SIGN OUT
            </Link>
          </p>
        ) : null}
      </div>
      <Outlet />
    </>
  );
}

export default Home;
