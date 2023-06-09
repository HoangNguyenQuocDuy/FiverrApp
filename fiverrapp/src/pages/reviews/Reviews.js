import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "./reviews.module.scss";
import Review from "../review/Review";
import useFetchDataVerifyToken from "../../customHooks/useFetchDataVerifyToken";
import axiosJWT from "../../utils/requestRefreshToken";

const cx = classNames.bind(styles);

function Reviews({ gigId }) {
  const [star, setStart] = useState(0);
  const [evaluation, setEvaluation] = useState("");
  const queryClient = useQueryClient();
  
  const [isLoading, error, data] = useFetchDataVerifyToken(['reviews'], `/reviews/${gigId}`);

  const dataReverse = data&&data.toReversed();

  const handleClickStar = (e) => {
    const newStar = e.target.parentNode.getAttribute("value");
    if (star !== newStar) setStart(newStar);
    else setStart(0);
  };

  const mutation = useMutation({
    mutationFn: (review) => {
      return axiosJWT.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (evaluation !== "" && star > 0) {
      mutation.mutate({ gigId, star, desc: evaluation });
      setEvaluation('')
      setStart(0)
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("box-createReview")}>
        <h2 className={cx("title")}>Writing review</h2>
        <section className={cx("section")}>
          <input
            placeholder="Writing your opinions"
            className={cx("content")}
            value={evaluation}
            onChange={(e) => {
              setEvaluation(e.target.value);
            }}
          />
          <div className={cx("box-stars")}>
            <span
              onClick={handleClickStar}
              value={1}
              className={cx("star", { active: star >= 1 })}
            >
              <i className="fa-solid fa-star"></i>
            </span>
            <span
              onClick={handleClickStar}
              value={2}
              className={cx("star", { active: star >= 2 })}
            >
              <i className="fa-solid fa-star"></i>
            </span>
            <span
              onClick={handleClickStar}
              value={3}
              className={cx("star", { active: star >= 3 })}
            >
              <i className="fa-solid fa-star"></i>
            </span>
            <span
              onClick={handleClickStar}
              value={4}
              className={cx("star", { active: star >= 4 })}
            >
              <i className="fa-solid fa-star"></i>
            </span>
            <span
              onClick={handleClickStar}
              value={5}
              className={cx("star", { active: star >= 5 })}
            >
              <i className="fa-solid fa-star"></i>
            </span>
          </div>
          <button
            type="submit"
            onClick={handleCreateReview}
            className={cx("btn-postRv")}
          >
            Send
          </button>
          {mutation.isError && (
            <div className={cx("err")}>{mutation.error.response.data}</div>
          )}
        </section>
      </div>
      <div className={cx("reviews")}>
        <h2 className={cx("title")}>Reviews</h2>
        {isLoading
          ? "Loading reviews"
          : error
          ? "Something went wrong!"
          : dataReverse.map((review) => {
              return <Review key={review._id} review={review} />;
            })}
      </div>
    </div>
  );
}

export default Reviews;
