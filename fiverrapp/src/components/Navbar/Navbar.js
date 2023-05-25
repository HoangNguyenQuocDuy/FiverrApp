import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import routers from "../../configs/routers";
import styles from "./navbar.module.scss";
import newRequest from "../../utils/newRequest";
import { Logo } from "../../icons"; 

const cx = classNames.bind(styles);

function Navbar() {
  const { pathname } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const [openLink, setOpenLink] = useState(false);
  const navigate = useNavigate()

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

  const handleOpenOptions = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/")
    } catch (err) {}
  };
  return (
    <div className={cx("navBar", { active: active || pathname !== "/" })}>
      <div className={cx("max-width-box", "nav")}>
        <span
          onClick={() => {
            setOpenLink(true);
          }}
          className={cx("list-icon")}
        >
          <i className="fa-solid fa-list"></i>
        </span>
        <Link className={cx("logo")} to={routers.home}>
        <Logo width={89} height={27} />
        </Link>
        <ul className={cx("links", { hide: !openLink })}>
          <span
            onClick={() => {
              setOpenLink(false);
            }}
            className={cx("close-icon")}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
          <li>Fiverr Business</li>
          <li>Explore</li>
          <li>English</li>
          {currentUser && !currentUser.isSeller && <li>Become a Seller</li>}
          {currentUser && !currentUser && <li>Sign in</li>}
          {!currentUser && (
            <li>
              <button onClick={() => {navigate('/login')}} className={cx("join-btn")}>Join</button>
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
                src={(currentUser.img!=="" && currentUser.img) || "./imgs/noavatar.png"}
                alt="avatar"
              />
              <span className={cx("userName")}>{currentUser.username}</span>
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
                  <Link
                    onClick={handleLogout}
                    to={routers.home}
                    className={cx("item")}
                  >
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
