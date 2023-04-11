import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./gig.module.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Slide from "../../components/slide/Slide";
import Gallery from "../../components/gallery/Gallery";
import { AppContext } from "../../context/AppProvider";

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

  const imgs = [
    {
      id: 1,
      src: "/imgs/1.webp",
    },
    {
      id: 2,
      src: "/imgs/2.jpg",
    },
    {
      id: 3,
      src: "/imgs/3.webp",
    },
    {
      id: 4,
      src: "/imgs/4.jpg",
    },
    {
      id: 5,
      src: "/imgs/5.webp",
    },
  ];

  const { openGallery, setOpenGallery, itemsGallery, setItemsGallery } =
    useContext(AppContext);

  const handleClickImg = (e) => {
    setOpenGallery(!openGallery);
    imgs.forEach((item) => {
      {
        if (item.src === e.target.src.slice(21))
          setItemsGallery(
            imgs.slice(item.id - 1).concat(imgs.slice(0, item.id - 1))
          );
      }
    });
  };

  return (
    <>
      <div className={cx("wrapper", "max-width-box")}>
        <div className={cx("wrapper-left")}>
          <Breadcrumbs items={breadcrumbs} />
          <h1 className={cx("title")}>
            I will make amazing fictional ai art, ai portraits, ai character
            design
          </h1>
          <div className={cx("info-gig")}>
            <div className={cx("avatar")}>
              <img src="/imgs/5.webp" />
            </div>
            <span className={cx("name")}>itsjason</span>
            <div className={cx("divide")}></div>
            <span className={cx("star")}>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className={cx("star")}>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className={cx("star")}>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className={cx("star")}>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className={cx("star")}>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className={cx("starNumber")}>5 Orders in Queue</span>
          </div>
          <Slide
            slickSlideScale={true}
            className={cx("slide")}
            onClick={handleClickImg}
            setting={settingsImgs}
            items={imgs}
            component={null}
          />
          <div className={cx("wrp-price")}>
            <div className={cx("price-box")}>
              <p>1 Variation Images to explore your concept</p>
              <div className={cx("price")}>
                <i className="fa-solid fa-dollar-sign"></i> 20
              </div>
            </div>
            <div className={cx("additional")}>
              <div className={cx("delivery")}>
                <i className="fa-solid fa-clock-rotate-left"></i>
                10 Days Delivery
              </div>
              <div className={cx("revision")}>
                <i className="fa-solid fa-repeat"></i>2 Revisions
              </div>
            </div>
            <ul className={cx("features")}>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Prompt writing
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Prompt delivery
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Generated image examples
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Artwork delivery
              </li>
            </ul>
            <button className={cx("btn-continue")}>Continue</button>
          </div>
          <div className={cx("aboutGig")}>
            <h2 className={cx("title")}>About this gig</h2>
            <p className={cx("content")}>
              Hi, my name is Jason, I am an AI digital artist and I will create
              images for you, based on your requirements, using different kind
              of AI software.
            </p>
          </div>
          <div className={cx("seller")}>
            <div className={cx("contact")}>
              <div className={cx("avatar")}>
                <img src={"/imgs/5.webp"} />
              </div>
              <div className={cx("info")}>
                <h4>itsjason</h4>
                <div className={cx("boxStar")}>
                  <span className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className={cx("star")}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className={cx("starNumber")}>5</span>
                </div>
                <button className={cx("contact-btn")}>Contact me</button>
              </div>
            </div>
            <div className={cx("details")}>
              <ul className={cx("menu")}>
                <li className={cx("item")}>
                  <p className={cx("title")}>From</p>
                  <p className={cx("content")}>Netherlands</p>
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
              <hr className={cx("separate")} />
              <p className={cx("desc")}>
                Hey! I am an AI-powered art seller on Fiverr, providing
                custom-made masterpieces that'll take your breath away. From
                character portraits to fan art, I use the latest AI technology
                to bring your favorite characters to life. With fast turnaround
                times, affordable prices, and exceptional quality. Order now and
                see the magic unfold!
              </p>
            </div>
            <div className={cx("chat-wrapper")}>
              <h2 className={cx("title")}>Reviews</h2>
              {/* Tách */}
              <div className={cx("chat-box")}>
                <div className={cx("user")}>
                  <div className={cx("avatar")}>
                    <img src="/imgs/5.webp" />
                  </div>
                  <div className={cx("detail")}>
                    <h5 className={cx("name")}>itsjason</h5>
                    <p className={cx("nationality")}>
                      <i className="fa-solid fa-flag-usa"></i>
                      United States
                    </p>
                  </div>
                </div>
                <div className={cx("review")}>
                  <div className={cx("star-wrapper")}>
                    <span className={cx("boxStar")}>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("starNumber")}>5</span>
                    </span>
                    <span className={cx("time")}>3 weeks ago</span>
                  </div>
                  <p className={cx("content")}>
                    Jason really did his thing with my vision, he even finished
                    ahead of schedule which I did not expect, nor did I expect
                    that sheer awesomeness of the out come…. Blown away I am!
                  </p>
                </div>
                <div className={cx("evaluation")}>
                  <span className={cx("title")}>Helpful?</span>
                  <button className={cx("yes")}>
                    <i className="fa-regular fa-thumbs-up"></i> Yes
                  </button>
                  <button className={cx("no")}>
                    <i className="fa-regular fa-thumbs-down"></i> No
                  </button>
                </div>
              </div>
              <div className={cx("chat-box")}>
                <div className={cx("user")}>
                  <div className={cx("avatar")}>
                    <img src="/imgs/5.webp" />
                  </div>
                  <div className={cx("detail")}>
                    <h5 className={cx("name")}>itsjason</h5>
                    <p className={cx("nationality")}>
                      <i className="fa-solid fa-flag-usa"></i>
                      United States
                    </p>
                  </div>
                </div>
                <div className={cx("review")}>
                  <div className={cx("star-wrapper")}>
                    <span className={cx("boxStar")}>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("starNumber")}>5</span>
                    </span>
                    <span className={cx("time")}>3 weeks ago</span>
                  </div>
                  <p className={cx("content")}>
                    Jason really did his thing with my vision, he even finished
                    ahead of schedule which I did not expect, nor did I expect
                    that sheer awesomeness of the out come…. Blown away I am!
                  </p>
                </div>
                <div className={cx("evaluation")}>
                  <span className={cx("title")}>Helpful?</span>
                  <button className={cx("yes")}>
                    <i className="fa-regular fa-thumbs-up"></i> Yes
                  </button>
                  <button className={cx("no")}>
                    <i className="fa-regular fa-thumbs-down"></i> No
                  </button>
                </div>
              </div>
              <div className={cx("chat-box")}>
                <div className={cx("user")}>
                  <div className={cx("avatar")}>
                    <img src="/imgs/5.webp" />
                  </div>
                  <div className={cx("detail")}>
                    <h5 className={cx("name")}>itsjason</h5>
                    <p className={cx("nationality")}>
                      <i className="fa-solid fa-flag-usa"></i>
                      United States
                    </p>
                  </div>
                </div>
                <div className={cx("review")}>
                  <div className={cx("star-wrapper")}>
                    <span className={cx("boxStar")}>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("star")}>
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className={cx("starNumber")}>5</span>
                    </span>
                    <span className={cx("time")}>3 weeks ago</span>
                  </div>
                  <p className={cx("content")}>
                    Jason really did his thing with my vision, he even finished
                    ahead of schedule which I did not expect, nor did I expect
                    that sheer awesomeness of the out come…. Blown away I am!
                  </p>
                </div>
                <div className={cx("evaluation")}>
                  <span className={cx("title")}>Helpful?</span>
                  <button className={cx("yes")}>
                    <i className="fa-regular fa-thumbs-up"></i> Yes
                  </button>
                  <button className={cx("no")}>
                    <i className="fa-regular fa-thumbs-down"></i> No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("wrapper-right")}>
          <div className={cx("wrp")}>
            <div className={cx("price-box")}>
              <p>1 Variation Images to explore your concept</p>
              <div className={cx("price")}>
                <i className="fa-solid fa-dollar-sign"></i> 20
              </div>
            </div>
            <div className={cx("additional")}>
              <div className={cx("delivery")}>
                <i className="fa-solid fa-clock-rotate-left"></i>
                10 Days Delivery
              </div>
              <div className={cx("revision")}>
                <i className="fa-solid fa-repeat"></i>2 Revisions
              </div>
            </div>
            <ul className={cx("features")}>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Prompt writing
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Prompt delivery
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Generated image examples
              </li>
              <li className={cx("feature")}>
                <span className={cx("check-icon")}>
                  <i className="fa-solid fa-check"></i>
                </span>
                Artwork delivery
              </li>
            </ul>
            <button className={cx("btn-continue")}>Continue</button>
          </div>
        </div>
        {openGallery && <Gallery items={itemsGallery} setting={settingsImgs} />}
      </div>
    </>
  );
}

export default Gig;
