import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./register.module.scss";
import { Logo } from "../../icons";
import newRequest from "../../utils/newRequest";

const cx = classNames.bind(styles);

function Register() {
  const [file, setFile] = useState();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    desc: "",
    isSeller: false,
    img: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user);
    // console.log(file);

    const formData = new FormData();
    formData.append("img", file);

    try {
      const upload = await newRequest.post("auth/upload", formData);
      // console.log(upload.data);

      const register = await newRequest.post("auth/register", { ...user, img: upload.data });
      console.log(register);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={cx("main")}>
      <form className={cx("form")} method="post" encType="multipart/form-data">
        <label className={cx("logo")}>
          <Logo width={89} height={27} />
        </label>
        <div className={cx("body-form")}>
          <div className={cx("left")}>
            <h2>Create a new account</h2>
            <label className={cx("username")}>
              <p>User name</p>
              <input
                name="username"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="duy123..."
              />
            </label>
            <label className={cx("email")}>
              <p>Email</p>
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="duy123@gmail.com"
              />
            </label>
            <label className={cx("password")}>
              <p>Password</p>
              <input
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="password..."
                type="password"
              />
            </label>
            <label className={cx("avatar")}>
              <p>Profile Picture</p>
              <input
                name="img"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                type="file"
              />
            </label>
            <label className={cx("country")}>
              <p>Country</p>
              <input
                name="country"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="VietNam"
              />
            </label>
          </div>
          <div className={cx("right")}>
            <h2>I want to become a seller</h2>
            <div className={cx("activateSeller")}>
              <p>Activate the seller account</p>
              <label className={cx("switch")}>
                <input
                  onChange={(e) => {
                    setUser((prev) => {
                      return { ...prev, isSeller: e.target.checked };
                    });
                  }}
                  type="checkbox"
                />
                <span className={cx("slider", "round")}></span>
              </label>
            </div>
            <label className={cx("phoneNumber")}>
              <p>Phone Number</p>
              <input
                name="phoneNumber"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="+8124523523"
                type="number"
              />
            </label>
            <label className={cx("desc")}>
              <p>Description</p>
              <textarea
                name="desc"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="A short description of yourself"
              />
            </label>

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className={cx("register-btn")}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Register;
