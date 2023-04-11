import { Link } from "react-router-dom";
import { useContext } from "react";
import classNames from "classnames/bind";

import styles from "./messages.module.scss";
import { AppContext } from "../../context/AppProvider";

const cx = classNames.bind(styles);

function Messages() {
  const { currentUser } = useContext(AppContext);

  let message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <h1 className={cx("title")}>Messages</h1>
      <table className={cx("messages")}>
        <thead>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("name")}>John Doe</td>
            <td className={cx("content")}>
              <Link className={cx("link")} to="/message/123">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td className={cx("time")}>1 hour ago</td>
            <td className={cx("action")}>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td className={cx("name")}>John Doe</td>
            <td className={cx("content")}>
              <Link className={cx("link")} to="/message/123">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td className={cx("time")}>1 hour ago</td>
            <td className={cx("action")}>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td className={cx("name")}>John Doe</td>
            <td className={cx("content")}>
              <Link className={cx("link")} to="/message/123">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td className={cx("time")}>1 hour ago</td>
            <td className={cx("action")}>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td className={cx("name")}>John Doe</td>
            <td className={cx("content")}>
              <Link className={cx("link")} to="/message/123">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td className={cx("time")}>1 hour ago</td>
            <td className={cx("action")}>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td className={cx("name")}>John Doe</td>
            <td className={cx("content")}>
              <Link className={cx("link")} to="/message/123">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td className={cx("time")}>1 hour ago</td>
            <td className={cx("action")}>
              <button>Mark as Read</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Messages;
