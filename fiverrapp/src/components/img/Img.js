import { forwardRef } from 'react'

import classNames from "classnames/bind";

import styles from "./img.module.scss";

const cx = classNames.bind(styles);

const Img = forwardRef(({ src, className, alt, onClick }, ref) => {


  return (
    <div
      onClick={onClick}
      className={cx("wrapper", className)}
      ref={ref}
      name='boxImg'
    >
      <img  src={src} alt={alt} />
    </div>
  );
})

export default Img;
