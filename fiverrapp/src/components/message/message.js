import { useQuery } from "@tanstack/react-query";
import request from "../../utils/newRequest";
import classNames from "classnames/bind";

import styles from "./message.module.scss";
import { memo } from "react";
import useFetchData from "../../customHooks/useFetchData";
import getCurrentUser from "../../utils/getCurrentUser";

const cx = classNames.bind(styles);

function MessageItem({ data, pos, noImg }) {
  const currentUser = getCurrentUser();

  const [ isLoadingUser, errorUser, dataUser ] = useFetchData(['user', data.userId], `/users/${data.userId}`)

  return (
    <div className={cx("item", { owner: currentUser._id === data.userId })}>
      {isLoadingUser
        ? "Loading..."
        : errorUser
        ? "Something went wrong!"
        : dataUser && (
            <>
              <div className={cx("avatar")}>
                {!noImg && <img src={(dataUser.img !== '' && dataUser.img !== undefined)? dataUser.img : "/imgs/noavatar.png"} alt="avatar" />}
              </div>
              <div className={cx("wrapper-content")}>
                <p className={cx("content", pos)}>
                  {data.desc}
                </p>
              </div>
            </>
          )}
    </div>
  );
}

export default memo(MessageItem);
