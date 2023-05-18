import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.scss";
import { Logo } from "../../icons";
import newRequest from "../../utils/newRequest";

const cx = classNames.bind(styles);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errLogin, setErrLogin] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await newRequest.post("auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(user.data));
      console.log(user.data);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setErrLogin(err.response.data);
    }
  };

  return (
    <main className={cx("main")}>
      <form className={cx("form")} method="post">
        <label className={cx("logo")} for="username">
          <Logo width={89} height={27} />
        </label>
        <header className={cx("header")}>
          <img />
        </header>
        <h1>Welcome back!</h1>
        <label for="username" className={cx("sub-title")}>
          User login
        </label>
        <div>
          <input
            id="username"
            placeholder="User name..."
            className={cx("inp-username")}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            ref={usernameRef}
          />
        </div>
        <hr />
        <div>
          <input
            type="password"
            placeholder="Password..."
            className={cx("inp-password")}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            ref={passwordRef}
          />
        </div>
        {errLogin !== "" && <div className={cx('errMessage')}>{errLogin}</div>}
        <div className={cx("box-btn")}>
          <button onClick={handleClickSubmit} className={cx("button")}>
            Login
          </button>
        </div>
        <footer className={cx("footer")}>
          <span className={cx("forgot-password")}>Forgot Password</span>
          <span className={cx("register")}>Register</span>
        </footer>
      </form>
    </main>
  );
}

export default Login;
