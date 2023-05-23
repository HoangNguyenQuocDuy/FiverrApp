import { useQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";
import moment from "moment";

import request from "../../utils/newRequest";
import styles from "./review.module.scss";

const cx = classnames.bind(styles);

function Review({ review }) {
  const timeNow = moment().format();
  const date = new Date(review.createdAt);

  const duration = moment.duration(moment(timeNow).diff(moment(date)))._data;
  console.log(duration);
  let createdTime;
  if (duration.years > 0) {
    if (duration.years > 1) createdTime = duration.years + " years ago";
    else createdTime = "1 year ago";
  } else if (duration.months > 0) {
    if (duration.months > 1) createdTime = duration.months + " months ago";
    else createdTime = "1 month ago";
  } else if (duration.days > 0) {
    if (duration.days > 1) createdTime = duration.days + " days ago";
    else createdTime = "1 day ago";
  } else if (duration.hours > 0) {
    if (duration.hours > 1) createdTime = duration.hours + " hours ago";
    else createdTime = "1 hours ago";
  } else if (duration.minutes >= 0) {
    if (duration.minutes > 1) createdTime = duration.minutes + " minutes ago"
    else createdTime = "1 minute ago";
  }

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: [review._id],
    queryFn: () =>
      request.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className={cx("chat-box")}>
      {isLoading ? (
        "Loading user..."
      ) : error ? (
        "Something went wrong~"
      ) : (
        <div className={cx("user")}>
          <div className={cx("avatar")}>
            <img src={user.img || "/imgs/noavatar.png"} />
          </div>
          <div className={cx("detail")}>
            <h5 className={cx("name")}>{user.username}</h5>
            <p className={cx("nationality")}>
              <i className="fa-solid fa-flag-usa"></i>
              {user.country}
            </p>
          </div>
        </div>
      )}
      <div className={cx("review")}>
        <div className={cx("star-wrapper")}>
          <span className={cx("boxStar")}>
            {Array(review.star)
              .fill()
              .map((item, idx) => {
                return (
                  <span key={idx} className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                );
              })}
            <span className={cx("starNumber")}>{review.star}</span>
          </span>
          <span className={cx("time")}>{createdTime}</span>
        </div>
        <p className={cx("content")}>
          {review.desc}
          {/* Jason really did his thing with my vision, he even finished ahead of
          schedule which I did not expect, nor did I expect that sheer
          awesomeness of the out come…. Blown away I am! */}
        </p>
      </div>
      <div className={cx("evaluation")}>
        <span className={cx("title")}>Helpful?</span>
        <button className={cx("yes")}>
          <i className="fa-regular fa-thumbs-up"></i> Yes
        </button>
        <button className={cx("no")}>
          <i className="fa-regular fa-thumbs-down"></i> No
        </button>
      </div>
    </div>
  );
}

export default Review;
