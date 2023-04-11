import classNames from 'classnames/bind';

import { FiverrIconFooter, Accessibility } from "../../icons";
import styles from  "./footer.module.scss";

const cx = classNames.bind(styles)

function Footer() {
  return (
    <div className={cx("max-width-box", 'wrapper')}>
      <div className={cx("container")}>
        <div className={cx("box")}>
          <p>Categories</p>
          <ul>
            <li>
              <a href="#">Graphics & Design</a>
            </li>
            <li>
              <a href="#">Digital Marketing</a>
            </li>
            <li>
              <a href="#">Writing & Translation</a>
            </li>
            <li>
              <a href="#">Video & Animation</a>
            </li>
            <li>
              <a href="#">Music & Audio</a>
            </li>
            <li>
              <a href="#">Programming & Tech</a>
            </li>
            <li>
              <a href="#">Data</a>
            </li>
            <li>
              <a href="#">Business</a>
            </li>
            <li>
              <a href="#">Lifestyle</a>
            </li>
            <li>
              <a href="#">Photography</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>
        <div className={cx("box")}>
          <p>About</p>
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press & News</a>
            </li>
            <li>
              <a href="#">Partnerships</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Intellectual Property Claims</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
          </ul>
        </div>
        <div className={cx("box")}>
          <p>Support</p>
          <ul>
            <li>
              <a href="#">Help & Support</a>
            </li>
            <li>
              <a href="#">Trust & Safety</a>
            </li>
            <li>
              <a href="#">Selling on Fiverr</a>
            </li>
            <li>
              <a href="#">Buying on Fiverr</a>
            </li>
          </ul>
        </div>
        <div className={cx("box")}>
          <p>Community</p>
          <ul>
            <li>
              <a href="#">Customer Success Stories</a>
            </li>
            <li>
              <a href="#">Community Hub</a>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Influencers</a>
            </li>
            <li>
              <a href="#">Affiliates</a>
            </li>
            <li>
              <a href="#">Podcast</a>
            </li>
            <li>
              <a href="#">Invite a Friend</a>
            </li>
            <li>
              <a href="#">Become a Seller</a>
            </li>
            <li>
              <a href="#">Community Standards</a>
            </li>
          </ul>
        </div>
        <div className={cx("box")}>
          <p>More From Fiverr</p>
          <ul>
            <li>
              <a href="#">Fiverr Business</a>
            </li>
            <li>
              <a href="#">Fiverr Pro</a>
            </li>
            <li>
              <a href="#">Fiverr Logo Maker</a>
            </li>
            <li>
              <a href="#">Fiverr Guides</a>
            </li>
            <li>
              <a href="#">Get Inspired</a>
            </li>
            <li>
              <a href="#">Fiverr Select</a>
            </li>
            <li>
              <a href="#">ClearVoice</a>
            </li>
            <li>
              <a href="#">Fiverr Workspace</a>
            </li>
            <li>
              <a href="#">Learn</a>
            </li>
            <li>
              <a href="#">Working Not Working</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("contact")}>
        <div className={cx("contact-left")}>
          <span className={cx("icon")}>
            <FiverrIconFooter width={91} height={27} />
          </span>
          <span className={cx("copyright")}>© Fiverr International Ltd. 2023</span>
        </div>
        <div className={cx("contact-right")}>
          <span className={cx("icons")}>
            <span>
              <i className="fa-brands fa-twitter"></i>
            </span>
            <span>
              <i className="fa-brands fa-facebook"></i>
            </span>
            <span>
              <i className="fa-brands fa-linkedin"></i>
            </span>
            <span>
              <i className="fa-brands fa-pinterest"></i>
            </span>
            <span>
              <i className="fa-brands fa-instagram"></i>
            </span>
          </span>
          <span className={cx('btns')}>
            <button className={cx("btn", 'btn-lan')}>
              <i className="fa-solid fa-globe"></i> English
            </button>
            <button className={cx("btn", 'btn-cur')}>
              <i className="fa-brands fa-gg-circle"></i> USD
            </button>
            <button className={cx("btn", 'accessibility')}>
              <span>
                <Accessibility width="32" height="32" />
              </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
