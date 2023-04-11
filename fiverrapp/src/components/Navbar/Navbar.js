import classNames from "classnames/bind";
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import routers from "../../configs/routers";
import styles from "./navbar.module.scss";
import { AppContext } from "../../context/AppProvider";

const cx = classNames.bind(styles);

function Navbar() {
  const { pathname } = useLocation();

  const { currentUser } = useContext(AppContext);

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const [openLink, setOpenLink] = useState(false);

  const optionsRef = useRef();
  const userOptionsRef = useRef();

  const isActive = () => {
    return window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const handleClickOutsideOptions = (e) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(e.target) &&
      !userOptionsRef.current.contains(e.target)
    )
      setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    window.addEventListener("mousedown", handleClickOutsideOptions);

    return () => {
      window.removeEventListener("scroll", isActive);
      window.removeEventListener("mousedown", handleClickOutsideOptions);
    };
  }, []);
  console.log(optionsRef);

  const handleOpenOptions = () => {
    setOpen(!open);
  };

  let cxNav =
    active || pathname !== "/"
      ? "navBar position-fixed active"
      : "navBar position-fixed";
  let cxDetail = pathname !== "/" ? "" : "d-none";
  return (
    <div className={cx("navBar", { active: active || pathname !== "/" })}>
      <div className={cx("max-width-box", "nav")}>
        <span onClick={() => {setOpenLink(true)}} className={cx("list-icon")}>
          <i className="fa-solid fa-list"></i>
        </span>
        <Link className={cx("logo")} to={routers.home}>
          <svg
            width="89"
            height="27"
            viewBox="0 0 89 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
            </g>
          </svg>
        </Link>
        <ul className={cx("links", { hide: !openLink })}>
          <span onClick={() => {setOpenLink(false)}} className={cx("close-icon")}><i className="fa-solid fa-xmark"></i></span>
          <li>Fiverr Business</li>
          <li>Explore</li>
          <li>English</li>
          {!currentUser.isSeller && <li>Become a Seller</li>}
          {!currentUser && <li>Sign in</li>}
          {!currentUser && (
            <li>
              <button className={cx("btn")}>Join</button>
            </li>
          )}
          {currentUser && (
            <li
              ref={userOptionsRef}
              onClick={handleOpenOptions}
              className={cx("user-options")}
            >
              <img
                className={cx("avatar")}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={cx("userName")}>{currentUser.userName}</span>
              {open && (
                <div ref={optionsRef} className={cx("options")}>
                  <Link to={routers.gigs} className={cx("item")}>
                    Gigs
                  </Link>
                  <Link to={routers.addNewGigs} className={cx("item")}>
                    Add New Gig
                  </Link>
                  <Link to={routers.orders} className={cx("item")}>
                    Orders
                  </Link>
                  <Link to={routers.messages} className={cx("item")}>
                    Messages
                  </Link>
                  <Link to={routers.home} className={cx("item")}>
                    Logout
                  </Link>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
      <div
        className={cx("max-width-box", "details", { active: pathname !== "/" })}
      >
        <Link>Graphics & Design</Link>
        <Link>Digital Marketing</Link>
        <Link>Writing & Translation</Link>
        <Link>Video & Animation</Link>
        <Link>Music & Audio</Link>
        <Link>Programming & Tech</Link>
        <Link>Photography</Link>
        <Link>Business</Link>
        <Link>AI Services</Link>
      </div>
    </div>
  );
}

export default Navbar;
