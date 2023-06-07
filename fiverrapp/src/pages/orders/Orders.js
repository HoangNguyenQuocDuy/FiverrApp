import  { useNavigate } from 'react-router-dom'
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import styles from "./orders.module.scss";
import request from "../../utils/newRequest";
import useFetchData from '../../customHooks/useFetchData';
import getCurrentUser from '../../utils/getCurrentUser';

const cx = classNames.bind(styles);
function Orders() {
  const [ isLoading, error, data ] = useFetchData("orders", '/orders');

  const currentUser = getCurrentUser();

  const navigate = useNavigate()

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await request.get(`/conversations/single/${id}`);
      navigate(`/messages/${res.data.id}`)
    } catch (err) {
      if (err.response.status === 404) {
        const res = await request.post("/conversations", {
          to: currentUser.sellerId ? buyerId : sellerId,
        });

        navigate(`/messages/${res.data.id}`)
      }
    }
  };

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <h1 className={cx("title")}>Orders</h1>
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : data.length === 0 ? (
        <p className={cx("noOrder")}>You don't have any orders</p>
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
                  <td className={cx("title")}>
                    <p>{order.title}</p>
                  </td>
                  <td>{order.price}</td>
                  <td>
                    <span className={cx("message-icon")}>
                      <i
                        onClick={() => {
                          handleContact(order);
                        }}
                        className="fa-regular fa-envelope"
                      ></i>
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
