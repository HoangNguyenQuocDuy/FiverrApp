import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./gigCard.module.scss";
import request from "../../utils/newRequest";
import { memo } from "react";
import useFetchData from "../../customHooks/useFetchData";

const cx = classNames.bind(styles);

function GigCard({ item }) {
  const [ isLoading, error, data ] = useFetchData(item._id, `/users/${item.userId}`)
  
  return (
    <>
      <div className={cx("gigCard")}>
        <Link className={cx("main-img")} to={`/gig/${item._id}`}>
          <img src={item.images[0]} />
        </Link>
        {isLoading
          ? "Loading"
          : error
          ? "Something went wrong!"
          : data && (
              <div className={cx("info")}>
                <div className={cx("user")}>
                  <img src={(data.img !== '' && data.img !== undefined) ? data.img : "/imgs/noavatar.png"} />
                  <Link to="/user?id=123" className={cx("name")}>
                    {data.username}
                  </Link>
                </div>
                <Link to={`/gigs/${item._id}`} className={cx("desc")}>
                  {item.shortDesc}
                </Link>
                <div className={cx("star")}>
                  <i className="fa-solid fa-star"></i>
                  <span>
                    {!isNaN(parseFloat(item.totalStar / item.starNumber ?? ""))
                      ? parseFloat(
                          item.totalStar / item.starNumber ?? ""
                        ).toFixed(1)
                      : ""}
                  </span>
                </div>
              </div>
            )}
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

          <Link to={`/gigs/${item._id}`}>
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

export default memo(GigCard);
