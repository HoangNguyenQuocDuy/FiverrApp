import classNames from "classnames/bind";
import { useEffect, useReducer, useRef, useState } from "react";

import styles from "./addGig.module.scss";
import { gigReducer, initialState } from "../../reducers/gigReducer";
import newRequest from "../../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosJWT from "../../utils/requestRefreshToken";

const cx = classNames.bind(styles);

function AddGigs() {
  const [state, dispatch] = useReducer(gigReducer, initialState);
  const [featureContent, setFeatureContent] = useState("");
  const featureRef = useRef();
  const [singleFile, setSingleFile] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name, value },
    });
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureContent !== "") {
      dispatch({
        type: "ADD_FEATURE",
        payload: featureContent,
      });
      featureRef.current.focus();
      setFeatureContent("");
    }
  };

  const handleRemoveFeature = (feature) => {
    dispatch({
      type: "REMOVE_FEATURE",
      payload: feature,
    });
    featureRef.current.focus();
  };

  useEffect(() => {
    const upload = async () => {
      try {
        const formData1 = new FormData();
        for (let f of files) formData1.append("imgs", f);

        const formData2 = new FormData();
        formData2.append("img", singleFile);

        const images = await newRequest.post("/auth/uploads", formData1);
        const cover = await newRequest.post("/auth/upload", formData2);
        console.log(images.data);
        console.log(cover.data);
        dispatch({
          type: "ADD_IMAGES",
          payload: { images: images.data, cover: cover.data },
        });
        
      } catch (err) {
        console.log(err);
      }
    };

    upload();
  }, [files, singleFile]);
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return axiosJWT.post(`/gigs`, gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  const handleAddGig = async () => {
    if (
      state.title.trim() !== "" &&
      state.desc.trim() !== "" &&
      state.cat.trim() !== "" &&
      state.price > 0 &&
      state.shortTitle.trim() !== "" &&
      state.shortDesc.trim() !== "" &&
      state.deliveryTime > 0 &&
      state.revisionNumber > 0 &&
      singleFile !== "" &&
      files !== []
    ) {
      mutation.mutate(state)
      navigate('/mygigs')
    }
  };

  return (
    <div className={cx("wrapper", "max-width-box")}>
      {/* {isLoading && (
        <div className={cx("load")}>
          <i className="fa-solid fa-spinner"></i>
        </div>
      )} */}
      <h1 className={cx("title")}>AddGigs</h1>
      <div className={cx("body")}>
        <div className={cx("info")}>
          <div>
            <label>
              <span className={cx("title")}>Title</span>
              <input
                type="text"
                placeholder="e.g. I will do something I'm really good at"
                name="title"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Category</span>
              <select
                name="cat"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                className={cx("cat")}
              >
                <option value="design">AI</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Cover Image</span>
              <input
                onChange={(e) => {
                  setSingleFile(e.target.files[0]);
                }}
                type="file"
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Upload Images</span>
              <input
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                type="file"
                multiple
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Description</span>
              <textarea
                id=""
                placeholder="Brief descriptions to introduce your service to customers"
                cols="0"
                rows="16"
                name="desc"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              ></textarea>
            </label>
          </div>
        </div>
        <div className={cx("details")}>
          <div>
            <label>
              <span className={cx("title")}>Short Title</span>
              <input
                name="shortTitle"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                type="text"
                placeholder="e.g. One-page web design"
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Short Description</span>
              <input
                placeholder="Short description of your service"
                name="shortDesc"
                type="text"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              ></input>
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Delivery Time (e.g. 3 days)</span>
              <input
                type="number"
                name="deliveryTime"
                onChange={(e) => {
                  handleChange(e.target.name, parseInt(e.target.value));
                }}
              />
            </label>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Revision Number</span>
              <input
                type="number"
                name="revisionNumber"
                onChange={(e) => {
                  handleChange(e.target.name, parseInt(e.target.value));
                }}
              />
            </label>
          </div>
          <div>
            <form className={cx("formFeature")}>
              <label>
                <span className={cx("title")}>Add Features</span>
                <input
                  ref={featureRef}
                  value={featureContent}
                  onChange={(e) => {
                    setFeatureContent(e.target.value);
                  }}
                  type="text"
                  placeholder="e.g. page design"
                />
              </label>
              <button
                type="submit"
                onClick={(e) => {
                  handleAddFeature(e);
                }}
                className={cx("addFeatureBtn")}
              >
                Add
              </button>
            </form>
            <div className={cx("features")}>
              {state?.features?.map((feature, idx) => {
                return (
                  <div key={idx} className={cx("feature")}>
                    {feature}
                    <span
                      onClick={() => {
                        handleRemoveFeature(feature);
                      }}
                      className={cx("removeIcon")}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label>
              <span className={cx("title")}>Price</span>
              <input
                type="number"
                name="price"
                onChange={(e) => {
                  handleChange(e.target.name, parseInt(e.target.value));
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className={cx("createBox")}>
        <button onClick={handleAddGig} className={cx("submit")}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AddGigs;
