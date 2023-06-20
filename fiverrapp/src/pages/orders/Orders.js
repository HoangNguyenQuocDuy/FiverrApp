import  { useNavigate } from 'react-router-dom'
import classNames from "classnames/bind";
import jwt_decode from "jwt-decode";

import styles from "./orders.module.scss";
import request from "../../utils/newRequest";
import useFetchDataVerifyToken from '../../customHooks/useFetchDataVerifyToken';
import getCurrentUser from '../../utils/getCurrentUser';
import axios from 'axios';
import newRequest from '../../utils/newRequest';
import axiosJWT from '../../utils/requestRefreshToken';

const cx = classNames.bind(styles);
function Orders() {
  const currentUser = getCurrentUser();
  const [ isLoading, error, data ] = useFetchDataVerifyToken("orders", '/orders');

  const navigate = useNavigate()

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await axiosJWT.get(`/conversations/single/${id}`);
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
