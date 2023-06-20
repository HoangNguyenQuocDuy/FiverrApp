import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./messages.module.scss";
import request from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import useFetchDataVerifyToken from "../../customHooks/useFetchDataVerifyToken";
import axiosJWT from "../../utils/requestRefreshToken";

const cx = classNames.bind(styles);

function Messages() {
  const currentUser = getCurrentUser();

  const [ isLoading, error, data ] = useFetchDataVerifyToken("conversations", `/conversations`);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosJWT.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <h1 className={cx("title")}>Messages</h1>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <table className={cx("messages")}>
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((conversation) => {
              return (
                <tr
                  key={conversation.id}
                  className={cx({
                    active: currentUser.isSeller
                      ? !conversation.readBySeller
                      : !conversation.readByBuyer,
                  })}
                >
                  <td className={cx("name")}>
                    {currentUser.isSeller
                      ? conversation.sellerId
                      : conversation.buyerId}
                  </td>
                  <td className={cx("content")}>
                    <Link
                      className={cx("link")}
                      to={`/messages/${conversation.id}`}
                    >
                      {!conversation.lastMessage
                        ? "New conversation"
                        : conversation.lastMessage.length > 100
                        ? conversation.lastMessage.substring(0, 100) + "..."
                        : conversation.lastMessage}
                    </Link>
                  </td>
                  <td className={cx("time")}>
                    {moment(conversation.updatedAt).fromNow()}
                  </td>
                  {(currentUser.isSeller
                    ? !conversation.readBySeller
                    : !conversation.readByBuyer) && (
                    <td className={cx("action")}>
                      <button
                        onClick={() => {
                          handleRead(conversation.id);
                        }}
                      >
                        Mark as Read
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Messages;
