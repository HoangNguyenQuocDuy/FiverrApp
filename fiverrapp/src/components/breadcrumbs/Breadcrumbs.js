import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./breadcrumbs.module.scss";

const cx = classNames.bind(styles);

function Breadcrumbs({ items, className }) {
  const itemsLength = items.length;

  return (
    <div className={cx("breadcrumbs", className)}>
      {items.map((item, idx) => {
        if (idx === 0)
          return (
            <Link className={cx({ icon: item.icon })} key={idx} to={item.path}>
              {item.title}
            </Link>
          );
        if (idx === itemsLength - 1)
          return (
            <span key={idx}>
              <span className={cx("slash")}>/</span>
              <span key={idx}>{item.title}</span>
            </span>
          );
        return (
          <span key={idx}>
            <span className={cx("slash")}>/</span>
            <Link className={cx({ icon: item.icon })} key={idx} to={item.path}>
              {item.title}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
