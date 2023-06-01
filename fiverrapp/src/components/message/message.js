import { useQuery } from "@tanstack/react-query";
import request from "../../utils/newRequest";
import classNames from "classnames/bind";

import styles from "./message.module.scss";
import { memo } from "react";

const cx = classNames.bind(styles);

function MessageItem({ data, pos, noImg }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [data.userId],
    queryFn: () => request.get(`/users/${data.userId}`).then((res) => res.data),
    enabled: !!data.userId,
  });

  dataUser && console.log(dataUser.img)

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
