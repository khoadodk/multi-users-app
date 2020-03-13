import { useState } from "react";
import axios from "axios";

import { API } from "../config";
import date from "../utils/formatDate";

const PopularLinks = ({ link }) => {
  // console.log(link);
  const {
    _id,
    title,
    url,
    postedBy,
    createdAt,
    type,
    medium,

    categories,
    clicks
  } = link;

  const [clickCount, setClickCount] = useState(clicks);

  const handleClickCount = async _id => {
    const response = await axios.put(`${API}/click-count`, { _id });
    setClickCount(response.data.clicks);
  };

  return (
    <>
      <div onClick={() => handleClickCount(_id)}>
        <a href={url} target="_blank">
          {title}
        </a>{" "}
        {clickCount} clicks
      </div>
    </>
  );
};

export default PopularLinks;
