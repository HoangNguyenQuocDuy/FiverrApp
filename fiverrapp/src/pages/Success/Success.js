import classnames from "classnames/bind";

import styles from "./success.module.scss";
import { useEffect } from "react";
import request from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

function Success() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await request.put("/orders", { payment_intent });

        setTimeout(() => {
            navigate('/orders')
        }, 5000)
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest()
  }, []);

  return (
    <div className={cx("wrapper", "max-width-box")}>
      Payment successful!. You are being redirect in the orders page. Please do
      not close the page.
    </div>
  );
}

export default Success;
