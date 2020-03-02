import date from '../utils/formatDate';

const PopularLinks = ({ link }) => {
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
  console.log(link);
  return (
    <>
      <div onClick={() => handleClick(_id)}>
        <a href={url} target="_blank">
          <p className="pt-2">{title}</p>
        </a>
        <span className="badge text-dark pull-right">{clicks} clicks</span>
      </div>

      <div>
        {categories.map(c => (
          <span key={c._id} className="badge text-success">
            {c.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default PopularLinks;
