import classNames from 'classnames/bind';
import { useState, useRef } from "react";
import styles from "./featured.module.scss";

const cx = classNames.bind(styles)

function Featured() {
  const searchContentRef = useRef();
  const [searchContent, setSearchContent] = useState("");

  const handleChangeSearchContent = (e) => {
    setSearchContent(e.target.value);
  };

  return (
    <div className={cx("max-width-box", 'wrapper')}>
      <div className={cx("left")}>
        <p className={cx("title")}>
          Find the perfect <i>freelance</i> services for your business
        </p>
        <form className={cx("search-form")}>
          <label className={cx("lb")}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              ref={searchContentRef}
              value={searchContent}
              onChange={handleChangeSearchContent}
              className={cx("search-content")}
              placeholder='Try "building mobile app"'
            />
            {searchContent !== "" && (
              <span onClick={() => {setSearchContent('')}} className={cx("clear-icon")}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            )}
          </label>
          <button className={cx("submit-btn")} type="submit">
            Search
          </button>
        </form>
        <div className={cx("popular")}>
          <span className={cx("title-text")}>Popular:</span>
          <button>Website Design</button>
          <button>WordPress</button>
          <button>Logo Design</button>
          <button>AI Services</button>
        </div>
      </div>
      <div className={cx("right")}>
        <img src="./imgs/man.png" />
      </div>
    </div>
  );
}

export default Featured;
