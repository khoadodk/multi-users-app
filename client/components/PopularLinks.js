import date from '../utils/formatDate';

const PopularLinks = ({ link, handleClick }) => {
  console.log(link);
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

  return (
    <>
      <div onClick={() => handleClick(_id)}>
        <a href={url} target="_blank">
          {title}
        </a>{' '}
        {clicks} clicks
      </div>
    </>
  );
};

export default PopularLinks;
