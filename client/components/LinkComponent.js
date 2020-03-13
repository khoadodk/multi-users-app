import { useState } from "react";
import axios from "axios";

import { API } from "../config";
import date from "../utils/formatDate";

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
    likes
  } = link;

  const [clickCount, setClickCount] = useState(clicks);
  const [likeCount, setLikeCount] = useState(likes);

  const handleClickCount = async _id => {
    const response = await axios.put(`${API}/click-count`, { _id });
    setClickCount(response.data.clicks);
  };

  const handleLikeCount = async _id => {
    const response = await axios.put(`${API}/like-count`, { _id });
    setLikeCount(response.data.likes);
  };

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
            <a onClick={() => handleLikeCount(_id)}>
              <i className="far fa-thumbs-up">{likeCount}</i>
            </a>
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
