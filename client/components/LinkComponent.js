import { useState } from "react";
import axios from "axios";

import { API } from "../config";
import date from "../utils/formatDate";
import { isAuth } from "../helpers/auth";

const LinkComponent = ({ link }) => {
  const {
    title,
    _id,
    url,
    clicks,
    createdAt,
    type,
    medium,
    postedBy,
    categories,
    likes,
    likeUsers
  } = link;

  const initialIsLiked = isAuth() && likeUsers.indexOf(isAuth()._id) > -1;

  const [clickCount, setClickCount] = useState(clicks);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // set the like button based on like or unlike
  let likeButton;
  isLiked
    ? (likeButton = <i className="fas fa-thumbs-up">&nbsp;{likeCount}</i>)
    : (likeButton = <i className="far fa-thumbs-up">&nbsp;{likeCount}</i>);

  // Check to see if there is atoken or user logged in
  let token;
  if (process.browser) {
    token = document.cookie.split("=")[1];
  }

  const handleClickCount = async _id => {
    const response = await axios.put(`${API}/click-count`, { _id });
    setClickCount(response.data.clicks);
  };

  let handleLikeCount;
  if (isAuth()) {
    handleLikeCount = async _id => {
      const response = await axios.put(
        `${API}/like-count`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLikeCount(response.data.likes);
      setIsLiked(!isLiked);
    };
  } else {
    handleLikeCount = () => {
      alert("Please log in or register to like");
      setIsLiked(false);
    };
  }

  return (
    <>
      <div className="col-md-8">
        <h5 className="pt-2">{title}</h5>
        <a href={url} target="_blank" onClick={() => handleClickCount(_id)}>
          <p className="pt-2 mb-0">{url}</p>
        </a>
      </div>
      <div className="col-md-4 pt-2">
        <div className="row d-flex justify-content-around">
          <h6 className="text-danger">{clickCount} Clicks</h6>
          <h6 className="text-primary">
            <a onClick={() => handleLikeCount(_id)}>{likeButton}</a>
          </h6>
        </div>

        <div className="ml-auto pt-4">
          {date(createdAt)} By
          <a href={"/profile/" + postedBy._id}>
            <strong> {postedBy.username}</strong>
          </a>
        </div>
      </div>
      <div className="col-md-12">
        <span className="badge text-dark">
          {type} / {medium}
        </span>
        {categories.map(c => (
          <span key={c._id} className="badge text-success">
            {c.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default LinkComponent;
