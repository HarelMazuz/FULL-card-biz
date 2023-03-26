import jwtDecode from "jwt-decode";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserData } from "../App";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  let navigate = useNavigate();
  let { isLoggedIn, setIsLoggedIn } = useContext(UserData);
  let [biz, setbiz] = useState<boolean>(false);
  useEffect(() => {
    if (isLoggedIn) {
      let payload: { biz: boolean } = jwtDecode(
        JSON.parse(sessionStorage.getItem("userData") as string).token
      );
      setbiz(payload.biz);
    } else setbiz(false);
  }, [isLoggedIn]);
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex">
          <img
            className="me-lg-4"
            src="/images/logo-no-background.png"
            alt="Bootstrap"
            width="auto"
            height="45"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex w-100">
              {isLoggedIn ? (
                <>
                  {biz && (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link "
                          aria-current="page"
                          to="/mycards"
                        >
                          My Cards
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/addcard"
                        >
                          New Card
                        </NavLink>
                      </li>
                    </>
                  )}

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/allcards"
                    >
                      All Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <button
                    className="btn btn-outline-danger ms-lg-auto"
                    onClick={() => {
                      navigate("/");
                      setIsLoggedIn(false);
                      sessionStorage.removeItem("userData");
                    }}
                  >
                    <i className="fa-solid fa-power-off me-1"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
