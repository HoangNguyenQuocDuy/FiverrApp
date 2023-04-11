import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import { cards, projects } from "../../data";
import { CheckIcon, FiverrBusiness } from "../../icons";
import Featured from "../../components/featured/Featured";
import styles from "./home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [isPallet, setIsPallet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowMobile, setIsLowMobile] = useState(false);
  const containerRef = useRef();

  let slidesToShowPopularServices = isPallet ? 3 : (isMobile ? 2 : (isLowMobile ? 1 : 5));
  let slideToScrollPopularServices = isPallet ? 3 : (isMobile ? 2 : (isLowMobile ? 1 : 5));
  let slidesToShowProducts = isPallet ? 3 : (isMobile ? 2 : (isLowMobile ? 1 : 4));
  let slideToScrollProducts = isPallet ? 3 : (isMobile ? 2 : (isLowMobile ? 1 : 4));

  let settingsPopularServices = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowPopularServices,
    slidesToScroll: slideToScrollPopularServices,
    arrows: false,
    centerPadding: "0",
  };

  let settingsProducts = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowProducts,
    slidesToScroll: slideToScrollProducts,
    arrows: false,
    centerPadding: "0px",
    // centerMode: true,
  };

  useEffect(() => {
    if (
      containerRef.current.clientWidth < 1024 &&
      containerRef.current.clientWidth >= 768
    )
      setIsPallet(true);
    else if (
      containerRef.current.clientWidth < 768 &&
      containerRef.current.clientWidth >= 640
    )
      setIsMobile(true);
    else if (containerRef.current.clientWidth < 640) setIsLowMobile(true);
    else {
      setIsMobile(false);
      setIsPallet(false);
      setIsLowMobile(false)
    }
  }, []);
  return (
    <div ref={containerRef} className={cx("home")}>
      <div className={cx("banner")}>
        <Featured />
      </div>
      <TrustedBy />
      <div className={cx("popular-box", "max-width-box")}>
        <h2>Popular professional services</h2>
        <Slide
          items={cards}
          settings={settingsPopularServices}
          component="catCard"
        />
      </div>
      <div className={cx("selling-proposition-box")}>
        <div className={cx("selling-proposition-wrapper", "max-width-box")}>
          <div className={cx("selling-proposition-left")}>
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    The best for every budget
                  </span>
                </div>
                <p className={cx("item-content")}>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    Quality work done quickly
                  </span>
                </div>
                <p className={cx("item-content")}>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    Protected payments, every time
                  </span>
                </div>
                <p className={cx("item-content")}>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>20/7 support</span>
                </div>
                <p className={cx("item-content")}>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div className={cx("selling-proposition-right")}>
            <img src="./imgs/selling.webp" />
          </div>
        </div>
      </div>

      <div className={cx("business-box")}>
        <div className={cx("business-wrapper", "max-width-box")}>
          <div className={cx("business-left")}>
            <div className={cx("business-icon")}>
              <span className={cx("icon")}>
                <FiverrBusiness width={178} height={22} />
              </span>
              <span className={cx("new")}>NEW</span>
            </div>
            <h2>
              A business solution designed for <i>teams</i>
            </h2>
            <p className={cx("desc")}>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <ul>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    Connect to freelancers with proven business experience
                  </span>
                </div>
              </li>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    Get matched with the perfect talent by a customer success
                    manager
                  </span>
                </div>
              </li>
              <li>
                <div className={cx("sell-item")}>
                  <span className={cx("check-icon")}>
                    <CheckIcon width="20" height="20" color="#7A7D85" />
                  </span>
                  <span className={cx("item-title")}>
                    Manage teamwork and boost productivity with one powerful
                    workspace
                  </span>
                </div>
              </li>
            </ul>
            <button className={cx("btn-explore")}>
              Explore Fiverr Business
            </button>
          </div>
          <div className={cx("business-right")}>
            <img src="./imgs/business.webp" />
          </div>
        </div>
      </div>
      <div className={cx("products")}>
        <h2 className={cx("max-width-box")}>
          Get inspired with projects made by our freelancers
        </h2>
        <Slide
          items={projects}
          settings={settingsProducts}
          component="productCard"
          maxBox={true}
        />
      </div>
    </div>
  );
}

export default Home;
