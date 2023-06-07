import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import GigCard from "../../components/gigCard/GigCard";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import request from "../../utils/newRequest";

import styles from "./gigs.module.scss";
import useFetchData from "../../customHooks/useFetchData";

const cx = classNames.bind(styles);

function Gigs() {
  const [sortBy, setSortBy] = useState("Best Selling");
  const [sort, setSort] = useState("totalStar");
  const [openSortOptions, setOpenSortOptions] = useState(false);

  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const { search } = useLocation();

  const sortOptionsRef = useRef();
  const sortByRef = useRef();
  const inpMaxRef = useRef();
  const inpMinRef = useRef();
  
  const [ isLoading, error, data, refetch ] = useFetchData('gigs', `/gigs${search}&min=${min}&max=${max}&sort=${sort}`)
  console.log(data);

  const breadcrumbs = [
    {
      title: <i className="fa-solid fa-house"></i>,
      path: "/",
    },
    {
      title: "Graphics & Design",
      path: null,
    },
  ];

  const handleChangeSortBy = (option) => {
    setSortBy(option.title);
    setSort(option.name);
  };

  const sortOptions = [
    {
      name: "totalStar",
      title: "Best Selling",
    },

    {
      name: "createdAt",
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

  const handleClickApply = () => {
    refetch();
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutsideSortOptions);

    return () => {
      window.removeEventListener("mousedown", handleClickOutsideSortOptions);
    };
  }, []);
  useEffect(() => {
    refetch();
  }, [sortBy]);

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <div className={cx("header")}>
        <Breadcrumbs className={cx("breadcrumbs")} items={breadcrumbs} />
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
            <button onClick={handleClickApply} className={cx("btn")}>
              Apply
            </button>
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
                      handleChangeSortBy(option);
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
        {isLoading
          ? "Loading"
          : error
          ? "Something is wrong!"
          : data &&
            data.map((project) => (
              <li className={cx("item")} key={project._id}>
                <GigCard item={project} />
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Gigs;
