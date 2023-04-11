import { useRef, useEffect, useContext } from "react";
import classNames from "classnames/bind";

import styles from "./gallery.module.scss";
import Slide from "../slide/Slide";
import { AppContext } from "../../context/AppProvider";

const cx = classNames.bind(styles);

function Gallery({ items, setting }) {
  const imgRef = useRef();
  const { setOpenGallery } = useContext(AppContext);

  const handlePressESC = (e) => {
    if (e.keyCode === 27) setOpenGallery(false);
  };

  const handleClickOutsideImg = (e) => {
    if (
      imgRef.current &&
      e.target.getAttribute("name") !== "slickButton" &&
      e.target.getAttribute("name") !== "slickButton-icon" &&
      imgRef.current.getAttribute("name") !==
        e.target.parentNode.getAttribute("name")
    ) {
      setOpenGallery(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlePressESC);
    window.addEventListener("mousedown", handleClickOutsideImg);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
      window.removeEventListener("mousedown", handleClickOutsideImg);
    };
  }, []);

  return (
    <div className={cx("gallery")}>
      <Slide
        slickSlideMaxH={true}
        className={cx("slide")}
        clImg={cx("img")}
        setting={setting}
        items={items}
        component={null}
        imgRef={imgRef}
        handleClickCloseBtn={() => {
          setOpenGallery(false);
        }}
      />
    </div>
  );
}

export default Gallery;
