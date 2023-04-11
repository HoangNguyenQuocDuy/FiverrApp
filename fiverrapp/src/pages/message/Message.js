import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./message.module.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const cx = classNames.bind(styles);

function Message() {
  let breadcrumbs = [
    {
      title: "Message",
      path: "/messages",
    },
    {
      title: "John Doe",
      path: "",
    },
  ];

  return (
    <div className={cx("wrapper",  'max-width-box')}>
      <div className={cx("container")}>
        <Breadcrumbs items={breadcrumbs} className={cx("breadcrumb")} />
        <div className={cx("message")}>
          <div className={cx("item")}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className={cx("item", 'owner')}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className={cx("item")}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className={cx("item")}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className={cx("item", 'owner')}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
          <div className={cx("item")}>
            <div className={cx("avatar")}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            </div>
            <p className={cx('content')}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
              mollitia perspiciatis officiis voluptate? Sequi quae officia
              possimus, iusto labore alias mollitia eveniet nemo placeat
              laboriosam nisi animi! Error, tenetur!
            </p>
          </div>
        </div>
        <div className={cx("write")}>
          <textarea type="text" placeholder="write a message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Message;
