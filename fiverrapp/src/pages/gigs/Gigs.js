import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import GigCard from "../../components/gigCard/GigCard";
import { gigs } from "../../data";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

import styles from "./gigs.module.scss";

const cx = classNames.bind(styles);

function Gigs() {
  const [sortBy, setSortBy] = useState("Best Selling");
  const [openSortOptions, setOpenSortOptions] = useState(false);

  const [max, setMax] = useState("");
  const [min, setMin] = useState("");

  const sortOptionsRef = useRef();
  const sortByRef = useRef();
  const inpMaxRef = useRef();
  const inpMinRef = useRef();

  const breadcrumbs = [
    {
      title: <i className="fa-solid fa-house"></i>,
      path: '/'
    },
    {
      title: 'Graphics & Design',
      path: null,
    },
  ]

  const handleChangeSortBy = (title) => {
    setSortBy(title);
  };

  const sortOptions = [
    {
      title: "Best Selling",
    },

    {
      title: "Newest",
    },
  ];

  const handleClickOutsideSortOptions = (e) => {
    if (
      sortOptionsRef.current &&
      !sortOptionsRef.current.contains(e.target) &&
      !sortByRef.current.contains(e.target)
    )
      setOpenSortOptions(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutsideSortOptions);

    return () => {
      window.removeEventListener("mousedown", handleClickOutsideSortOptions);
    };
  }, []);

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <div className={cx("header")}>
        <Breadcrumbs className={cx('breadcrumbs')} items={breadcrumbs} />
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className={cx("find-sort")}>
          <div className={cx("find")}>
            <label className={cx("title")}>
              <span className={cx("bud")}>Budged</span>
              <span className={cx("inp", "mlr")}>
                <input
                  value={min}
                  onChange={(e) => {
                    setMin(e.target.value);
                  }}
                  ref={inpMinRef}
                  type="number"
                  className={cx("inp-min")}
                  placeholder="Min"
                />
                {min !== "" && (
                  <i
                    onClick={() => {
                      setMin("");
                    }}
                    className="fa-solid fa-xmark"
                  ></i>
                )}
              </span>
              <span className={cx("inp")}>
                <input
                  value={max}
                  onChange={(e) => {
                    setMax(e.target.value);
                  }}
                  ref={inpMaxRef}
                  type="number"
                  className={cx("inp-max")}
                  placeholder="Max"
                />
                {max !== "" && (
                  <i
                    onClick={() => {
                      setMax("");
                    }}
                    className="fa-solid fa-xmark"
                  ></i>
                )}
              </span>
            </label>
            <button className={cx("btn")}>Apply</button>
          </div>
          <div className={cx("sort")}>
            <div>Sort by</div>
            <div
              ref={sortByRef}
              onClick={() => {
                setOpenSortOptions(!openSortOptions);
              }}
              className={cx("sort-options")}
            >
              {sortBy}
              <ul
                className={cx({ active: openSortOptions })}
                ref={sortOptionsRef}
              >
                {sortOptions.map((option, idx) => (
                  <li
                    onClick={() => {
                      handleChangeSortBy(option.title);
                    }}
                    key={idx}
                  >
                    {sortBy === option.title && (
                      <i className="fa-solid fa-check"></i>
                    )}
                    {option.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul className={cx("menu")}>
        {gigs.map((project) => (
          <li className={cx("item")} key={project.id}>
            <GigCard item={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gigs;
