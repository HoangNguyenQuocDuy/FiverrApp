import classNames from 'classnames/bind'

import Navbar from "../Navbar/Navbar";
import styles from './header.module.scss'

const cx = classNames.bind(styles)

function Header() {
  return (
    <div className={cx("header bg-success")}>
      <Navbar />
    </div>
  );
}

export default Header;
