import classNames from "classnames/bind";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CatCard from "../catCard/CatCard";
import ProductCard from "../productCard/ProductCard";
import styles from "./slide.module.scss";
import Img from "../img/Img";
import "./slide.scss";

const cx = classNames.bind(styles);

export default function Slide({
  items,
  settings,
  component,
  onClick,
  maxBox,
  className,
  clImg,
  slickSlideMaxH,
  imgRef,
  handleClickCloseBtn,
  slickSlideScale,
}) {
  const sliderRef = useRef();

  return (
    <div className={cx("wrapper", className, { "max-width-box": maxBox })}>
      <Slider
        ref={sliderRef}
        {...settings}
        className={`${slickSlideMaxH && "slideMaxH"} wrapper-slider ${
          slickSlideScale && "slideScale"
        }`}
      >
        {items.map((item) => {
          if (component === "catCard")
            return <CatCard item={item} key={item.id} />;
          if (component === "productCard")
            return <ProductCard item={item} key={item.id} />;
          return (
            <Img
              className={clImg}
              onClick={onClick}
              src={item.src}
              key={item.id}
              ref={imgRef}
            />
          );
        })}
      </Slider>
      <div className={cx("custom-arrows")}>
        <button
          onClick={() => {
            sliderRef.current.slickPrev();
          }}
          className={cx("back")}
          name="slickButton"
        >
          <i name="slickButton-icon" className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={() => {
            sliderRef.current.slickNext();
          }}
          className={cx("next")}
          name="slickButton"
        >
          <i name="slickButton-icon" className="fa-solid fa-chevron-right"></i>
        </button>
        {handleClickCloseBtn && (
          <button className={cx("close")} onClick={handleClickCloseBtn}>
            <i name="slickButton-icon" className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    </div>
  );
}
