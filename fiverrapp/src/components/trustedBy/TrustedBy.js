import classNames from 'classnames/bind';
import styles from "./trustedBy.module.scss";

const cx = classNames.bind(styles)

function TrustedBy() {
  return (
    <div className={cx("trustedBy")}>
      <div className={cx("max-width-box", "wrapper")}>
        <span className={cx("trust-title")}>Trusted by:</span>
        <span className={cx("item")}>
          <img src="./imgs/meta.png" />
        </span>
        <span className={cx("item")}>
          <img src="./imgs/google.png" />
        </span>
        <span className={cx("item")}>
          <img src="./imgs/netflix.png" />
        </span>
        <span className={cx("item")}>
          <img src="./imgs/pandg.png" />
        </span>
        <span>
          <img src="./imgs/paypal.png" />
        </span>
      </div>
    </div>
  );
}

export default TrustedBy;
