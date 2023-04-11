import classNames from "classnames/bind";

import styles from "./addGig.module.scss";

const cx = classNames.bind(styles);

function AddGigs() {
  return (
    <div className={cx("wrapper", "max-width-box")}>
      <h1 className={cx("title")}>AddGigs</h1>
      <div className={cx("body")}>
        <div className={cx("info")}>
          <div>
            <label>
              <span className={cx('title')}>Title</span>
              <input
                type="text"
                placeholder="e.g. I will do something I'm really good at"
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Category</span>
              <select className={cx('cat')} name="cats">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Cover Image</span>
              <input type="file" />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Upload Images</span>
              <input type="file" multiple />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Description</span>
              <textarea
                name=""
                id=""
                placeholder="Brief descriptions to introduce your service to customers"
                cols="0"
                rows="16"
              ></textarea>
            </label>
          </div>
          <button className={cx('submit')}>Create</button>
        </div>
        <div className={cx("details")}>
          <div>
            <label>
              <span className={cx('title')}>Service Title</span>
              <input type="text" placeholder="e.g. One-page web design" />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Short Description</span>
              <textarea
                name=""
                id=""
                placeholder="Short description of your service"
                cols="30"
                rows="10"
              ></textarea>
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Delivery Time (e.g. 3 days)</span>
              <input type="number" />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Revision Number</span>
              <input type="number" />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Add Features</span>
              <input type="text" placeholder="e.g. page design" />
              <input type="text" placeholder="e.g. file uploading" />
              <input type="text" placeholder="e.g. setting up a domain" />
              <input type="text" placeholder="e.g. hosting" />
            </label>
          </div>
          <div>
            <label>
              <span className={cx('title')}>Price</span>
              <input type="number" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGigs;
