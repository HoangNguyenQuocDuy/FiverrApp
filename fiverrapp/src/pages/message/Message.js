import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";

import styles from "./message.module.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MessageItem from "../../components/message/message";
import getCurrentUser from "../../utils/getCurrentUser";
import useFetchDataVerifyToken from "../../customHooks/useFetchDataVerifyToken";
import axiosJWT from "../../utils/requestRefreshToken";

const cx = classNames.bind(styles);

function Message() {
  const { id } = useParams();
  const currentUser = getCurrentUser()
  let chatUserId = currentUser.isSeller
    ? id.substring(currentUser._id.length)
    : id.substring(0, id.indexOf(currentUser._id));
  const [desc, setDesc] = useState("");
  const inpRef = useRef();
  const scrollBottomRef = useRef();

  const [ isLoading, error, data ] = useFetchDataVerifyToken(["conversations", id], `/messages/${id}`);

  const [ isLoadingChatUser, errorChatUser, dataChatUser ] = useFetchDataVerifyToken(['user', chatUserId], `/users/${chatUserId}`)

  console.log(chatUserId)

  let breadcrumbs = [
    {
      title: "Message",
      path: "/messages",
    },
    {
      title: dataChatUser?.username,
      path: "",
    },
  ];

  const scrollBottom = () => {
    scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBottom();
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (message) => {
      return axiosJWT.post("/messages", message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations", id]);
    },
  });

  const handleCreateMessage = (id) => {
    if (desc !== "") {
      mutation.mutate({ id, desc });
      inpRef.current.focus();
      setDesc("");
    }
  };

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <div className={cx("container")}>
        {dataChatUser && (
          <Breadcrumbs items={breadcrumbs} className={cx("breadcrumb")} />
        )}
        <section className={cx("box-chat")}>
          <section className={cx("box-message")}>
            <div className={cx("message")}>
              {isLoading ? (
                "Loading..."
              ) : error ? (
                "Something went wrong!"
              ) : data.length === 0 ? (
                <p className={cx("no-message")}>
                  Let's start chat with { dataChatUser?.username }
                </p>
              ) : (
                data.map((message, idx) => {
                  let prevMes = idx > 0 ? data[idx - 1] : "";
                  let nextMes = idx < data.length - 1 ? data[idx + 1] : "";

                  //0: user1, 1: user2, (): img=true

                  //0-
                  if (idx === 0) {
                    //0-(0)
                    if (nextMes !== "" && nextMes.userId === message.userId)
                      return (
                        <MessageItem
                          noImg={true}
                          pos="start"
                          data={message}
                          key={message._id}
                        />
                      );
                    //(0)-1
                    else
                      return (
                        <MessageItem
                          pos="between"
                          data={message}
                          key={message._id}
                        />
                      );
                  } else if (nextMes !== "") {
                    //0-0-0
                    if (
                      message.userId === prevMes.userId &&
                      message.userId === nextMes.userId
                    )
                      return (
                        <MessageItem
                          noImg={true}
                          pos="between"
                          data={message}
                          key={message._id}
                        />
                      );
                    //0-1-
                    else if (message.userId !== prevMes.userId) {
                      //0-1-1
                      if (nextMes.userId === message.userId)
                        return (
                          <MessageItem
                            noImg={true}
                            pos="start"
                            data={message}
                            key={message._id}
                          />
                        );
                      //0-(1)-0
                      else
                        return (
                          <MessageItem
                            pos="between"
                            data={message}
                            key={message._id}
                          />
                        );
                    }
                    //0-(0)-1
                    else if (
                      message.userId === prevMes.userId &&
                      message.userId !== nextMes.userId
                    )
                      return (
                        <MessageItem
                          pos="end"
                          data={message}
                          key={message._id}
                        />
                      );
                  }

                  //-0
                  else {
                    //1-(0)
                    if (message.userId !== prevMes.userId)
                      return (
                        <MessageItem
                          pos="between"
                          data={message}
                          key={message._id}
                        />
                      );
                    //0-0
                    else
                      return (
                        <MessageItem
                          pos="end"
                          data={message}
                          key={message._id}
                        />
                      );
                  }
                })
              )}
              <div ref={scrollBottomRef}></div>
            </div>
          </section>
          <section className={cx("write")}>
            <input
              value={desc}
              ref={inpRef}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              type="text"
              placeholder="write a message"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateMessage(id);
              }}
            />
            <button
              onClick={() => {
                handleCreateMessage(id);
              }}
            >
              Send
            </button>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Message;
