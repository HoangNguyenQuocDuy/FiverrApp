import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./gigCard.module.scss";

const cx = classNames.bind(styles);

function GigCard({ item }) {
  return (
    <>
      <div className={cx("gigCard")}>
        <Link className={cx('main-img')} to="/gig/1234">
          <img src={item.img} />
        </Link>
        <div className={cx("info")}>
          <div className={cx("user")}>
            <img src={item.pp} />
            <Link to="/user?id=123" className={cx("name")}>
              {item.username}
            </Link>
          </div>
          <Link to="/gig/123" className={cx("desc")}>
            {item.desc}
          </Link>
          <div className={cx("star")}>
            <i className="fa-solid fa-star"></i>
            <span>{parseFloat(item.star).toFixed(1)}</span>
          </div>
        </div>
        <hr />
        <div className={cx("detail")}>
          <span
            className={cx("heart-icon")}
            data-tooltip-content="Save to list"
            data-tooltip-id="heart-tooltip"
            data-tooltip-delay-show={100}
            data-tooltip-delay-hide={400}
          >
            <i className="fa-solid fa-heart"></i>
          </span>
          <Tooltip id="heart-tooltip" className={cx("tooltip-heart-icon")} />

          <Link to="/gig/123">
            <span className={cx("start-at")}>STARTING AT</span>
            <span className={cx("price")}>
              <i className="fa-solid fa-dollar-sign"></i>
              <span>{item.price}</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default GigCard;
