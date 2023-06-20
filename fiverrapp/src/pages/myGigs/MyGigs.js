import classNames from "classnames/bind";
import jwt_decode from "jwt-decode";
import axios from "axios";

import styles from "./myGigs.module.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchDataVerifyToken from "../../customHooks/useFetchDataVerifyToken";

const cx = classNames.bind(styles);
function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();


const axiosJWT = axios.create({
  baseURL: "http://localhost:3030/api/",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const res = newRequest.post("/refresh-token");

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    let date = new Date();
    const accessToken = localStorage.getItem("accessToken");
    const decodedToken = jwt_decode(accessToken);
    if (decodedToken > date.getTime() / 1000) {
      const newAccessToken = refreshToken();
      localStorage.setItem("accessToken", newAccessToken);
      config.headers["token"] = "Bearer " + newAccessToken;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

  const id = currentUser._id;

  const [isLoading, error, data] = useFetchDataVerifyToken(
    ['myGigs'],
    `/gigs?userId=${id}`
  );

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosJWT.delete(`/gigs/single/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  const handleDeleteGig = (id) => {
    mutation.mutate(id)
    console.log('deleted!, ',id)
  };

  console.log(data && data)

  return (
    <div className={cx("wrapper", "max-width-box")}>
      <header className={cx("header")}>
        <h1 className={cx("title")}>Gigs</h1>
        <button className={cx("add-gig-btn")}>Add new gig</button>
      </header>
      {isLoading
        ? "Loading"
        : error
        ? "Something went wrong!"
        : data && (
            <table className={cx("gigs")}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr key={gig._id}>
                    <td className={cx("img")}>
                      <img src={gig.cover && gig.cover !== '' ? gig.cover : gig.images[0]} />
                    </td>
                    <td>
                      {gig.title.length > 30
                        ? gig.title.substring(0, 30) + "..."
                        : gig.title}
                    </td>
                    <td>{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <span
                        className={cx("delete-icon")}
                        onClick={() => {
                          handleDeleteGig(gig._id);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
    </div>
  );
}

export default MyGigs;
