import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from "./catCard.module.scss";

const cx = classNames.bind(styles)

function CatCard({ item }) {
  return (
    <Link to='/gigs?cat=design' className={cx("catCard")}>
      <img className={cx("card-img")} src={item.img} />
      <div className={cx("card-info")}>
        <p className={cx("card-title")}>{item.title}</p>
        <h3 className={cx("card-desc")}>{item.desc}</h3>
      </div>
    </Link>
  );
}

export default CatCard;
