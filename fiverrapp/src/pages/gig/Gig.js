import { useContext } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import styles from "./gig.module.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Slide from "../../components/slide/Slide";
import Gallery from "../../components/gallery/Gallery";
import { AppContext } from "../../context/AppProvider";
import request from "../../utils/newRequest";
import Reviews from "../reviews/Reviews";

const cx = classNames.bind(styles);

function Gig() {

  const breadcrumbs = [
    {
      title: <i className="fa-solid fa-house"></i>,
      path: "/",
      icon: true,
    },
    {
      title: "Graphics & Design",
      path: "/gigs",
    },
    {
      title: "AI Artists",
      path: "/gig/:id",
    },
  ];

  let settingsImgs = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "0",
  };

  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gig"],
    queryFn: () => request.get(`/gigs/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => request.get(`/users/${userId}`).then((res) => res.data),
    // The query will not execute until the userId exists
    enabled: !!userId,
  });

  const userDesc = dataUser?.desc

  const { openGallery, setOpenGallery, itemsGallery, setItemsGallery } =
    useContext(AppContext);

  const handleClickImg = (e) => {
    setOpenGallery(!openGallery);
    let images = data.images;
    images.forEach((item, idx) => {
      {
        if (item === e.target.src)
          setItemsGallery(images.slice(idx).concat(images.slice(0, idx - 1)));
      }
    });
  };

  return (
    <>
      {isLoading
        ? "Loading"
        : error
        ? "Something went wrong!"
        : data && (
            <div className={cx("wrapper", "max-width-box")}>
              <div className={cx("wrapper-left")}>
                <Breadcrumbs items={breadcrumbs} />
                <h1 className={cx("title")}>{data.title}</h1>
                <div className={cx("info-gig")}>
                  {isLoadingUser
                    ? "Loading user..."
                    : errorUser
                    ? "Something went wrong"
                    : dataUser && (
                        <>
                          <div className={cx("avatar")}>
                            <img src={dataUser.img ?? "/imgs/noavatar.png"} />
                          </div>
                          <span className={cx("name")}>
                            {dataUser.username}
                          </span>
                        </>
                      )}
                  <div className={cx("divide")}></div>
                  <div className={cx("boxStar")}>
                    {Array(Math.round(data.totalStar / data.starNumber))
                      .fill()
                      .map((item, idx) => {
                        return (
                          <span key={idx} className={cx("star")}>
                            <i className="fa-solid fa-star"></i>
                          </span>
                        );
                      })}
                    <span className={cx("starNumber")}>
                      {!isNaN(Math.round(data.totalStar / data.starNumber))
                        ? Math.round(data.totalStar / data.starNumber).toFixed(
                            1
                          )
                        : ""}
                    </span>
                  </div>
                  <span className={cx("order")}>(5) Orders in Queue</span>
                </div>
                <Slide
                  slickSlideScale={true}
                  className={cx("slide")}
                  onClick={handleClickImg}
                  setting={settingsImgs}
                  items={data.images}
                  component={null}
                />
                {/* <div className={cx("wrp-price")}>
                  <div className={cx("price-box")}>
                    <p>{data.shortTitle}</p>
                    <div className={cx("price")}>
                      <i className="fa-solid fa-dollar-sign"></i> {data.price}
                    </div>
                  </div>
                  <div className={cx("additional")}>
                    <div className={cx("delivery")}>
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      {data.deliveryTime} Days Delivery
                    </div>
                    <div className={cx("revision")}>
                      <i className="fa-solid fa-repeat"></i>
                      {data.revisionNumber} Revisions
                    </div>
                  </div>
                  <ul className={cx("features")}>
                    {data.features && data.features.map((item, idx) => {
                      return (
                        <li key={idx} className={cx("feature")}>
                          <span className={cx("check-icon")}>
                            <i className="fa-solid fa-check"></i>
                          </span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                  <button className={cx("btn-continue")}>Continue</button>
                </div> */}
                <div className={cx("aboutGig")}>
                  <h2 className={cx("title")}>About this gig</h2>
                  <p className={cx("content")}>{data.desc}</p>
                </div>
                <div className={cx("seller")}>
                  {isLoadingUser ? (
                    "Loading user..."
                  ) : errorUser ? (
                    "Something went wrong!"
                  ) : (
                    <div className={cx("contact")}>
                      <div className={cx("avatar")}>
                        <img src={dataUser.img ?? "/imgs/noavatar.png"} />
                      </div>
                      <div className={cx("info")}>
                        <h4>{dataUser.username}</h4>
                        <div className={cx("boxStar")}>
                          {Array(Math.round(data.totalStar / data.starNumber))
                            .fill()
                            .map((item, idx) => {
                              return (
                                <span key={idx} className={cx("star")}>
                                  <i className="fa-solid fa-star"></i>
                                </span>
                              );
                            })}
                          <span className={cx("starNumber")}>
                            {!isNaN(
                              Math.round(data.totalStar / data.starNumber)
                            )
                              ? Math.round(
                                  data.totalStar / data.starNumber
                                ).toFixed(1)
                              : ""}
                          </span>
                        </div>
                        <button className={cx("contact-btn")}>
                          Contact me
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={cx("details")}>
                    {isLoadingUser
                      ? "Loading user..."
                      : errorUser
                      ? "Something went wrong"
                      : dataUser && (
                          <ul className={cx("menu")}>
                            <li className={cx("item")}>
                              <p className={cx("title")}>From</p>
                              <p className={cx("content")}>
                                {dataUser.country}
                              </p>
                            </li>
                            <li className={cx("item")}>
                              <p className={cx("title")}>Member since</p>
                              <p className={cx("content")}>Jul 2017</p>
                            </li>
                            <li className={cx("item")}>
                              <p className={cx("title")}>Avg. response time</p>
                              <p className={cx("content")}>1 hour</p>
                            </li>
                            <li className={cx("item")}>
                              <p className={cx("title")}>Last delivery</p>
                              <p className={cx("content")}>1 day</p>
                            </li>
                            <li className={cx("item")}>
                              <p className={cx("title")}>Languages</p>
                              <p className={cx("content")}>English, Dutch</p>
                            </li>
                          </ul>
                        )}
                    <hr className={cx("separate")} />
                    <p className={cx("desc")}>{userDesc}</p>
                  </div>
                  <div className={cx("chat-wrapper")}>
                    {/* Tách */}
                    <Reviews gigId={id} />
                  </div>
                </div>
              </div>
              <div className={cx("wrapper-right")}>
                <div className={cx("wrp")}>
                  <div className={cx("price-box")}>
                    <p>{data.shortTitle}</p>
                    <div className={cx("price")}>
                      <i className="fa-solid fa-dollar-sign"></i> {data.price}
                    </div>
                  </div>
                  <div className={cx("additional")}>
                    <div className={cx("delivery")}>
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      {data.deliveryTime} Days Delivery
                    </div>
                    <div className={cx("revision")}>
                      <i className="fa-solid fa-repeat"></i>
                      {data.revisionNumber} Revisions
                    </div>
                  </div>
                  <ul className={cx("features")}>
                    {data.features &&
                      data.features.map((item, idx) => {
                        return (
                          <li key={idx} className={cx("feature")}>
                            <span className={cx("check-icon")}>
                              <i className="fa-solid fa-check"></i>
                            </span>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                  <button className={cx("btn-continue")}>Continue</button>
                </div>
              </div>
              {openGallery && (
                <Gallery items={itemsGallery} setting={settingsImgs} />
              )}
            </div>
          )}
    </>
  );
}

export default Gig;
