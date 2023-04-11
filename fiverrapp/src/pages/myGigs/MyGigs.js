import classNames from "classnames/bind";

import styles from "./myGigs.module.scss";

const cx = classNames.bind(styles);
function MyGigs() {
  return (
    <div className={cx("wrapper", "max-width-box")}>
      <header className={cx("header")}>
        <h1 className={cx("title")}>Gigs</h1>
        <button className={cx("add-gig-btn")}>Add new gig</button>
      </header>
      <table className={cx("gigs")}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
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
              <span className={cx("delete-icon")}>
                <i className="fa-regular fa-trash-can"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyGigs;
