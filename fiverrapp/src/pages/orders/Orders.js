import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import styles from "./orders.module.scss";
import request from "../../utils/newRequest";

const cx = classNames.bind(styles);
function Orders() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => request.get(`/order`).then((res) => res.data),
  });

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <h1 className={cx("title")}>Orders</h1>
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : data.length === 0 ? (
        <p className={cx('noOrder')}>You don't have any orders</p>
      ) : (
        <table className={cx("orders")}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => {
              return (
                <tr key={order._id}>
                  <td className={cx("img")}>
                    <img src={order.img} />
                  </td>
                  <td className={cx('title')}><p>{order.title}</p></td>
                  <td>{order.price}</td>
                  <td>
                    <span className={cx("message-icon")}>
                      <i class="fa-regular fa-envelope"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
