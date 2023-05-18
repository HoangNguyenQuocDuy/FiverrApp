import { useQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";

import request from "../../utils/newRequest";
import styles from "./review.module.scss";

const cx = classnames.bind(styles);

function Review({ review }) {
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
          <span className={cx("time")}>3 weeks ago</span>
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
