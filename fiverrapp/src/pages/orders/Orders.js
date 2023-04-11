import { useContext } from 'react'
import classNames from "classnames/bind";

import styles from "./orders.module.scss";
import { AppContext } from "../../context/AppProvider"


const cx = classNames.bind(styles);
function Orders() {
    const { currentUser } = useContext(AppContext)

  return (
    <div className={cx("wrapper", "max-width-box")}>
        <h1 className={cx("title")}>Orders</h1>
      <table className={cx("orders")}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td className={cx("img")}>
              <img src="./imgs/1.webp" />
            </td>
            <td>Gig1</td>
            <td>999</td>
            <td>123</td>
            <td>
              <span className={cx("message-icon")}>
                <i class="fa-regular fa-envelope"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
