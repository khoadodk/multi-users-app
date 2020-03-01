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
      <div className="col-md-8" onClick={() => handleClick(_id)}>
        <a href={url} target="_blank">
          <p className="pt-2">{title}</p>
        </a>
      </div>

      <div className="col-md-4 pt-2">
        <span className="badge text-danger pull-right">{clicks} clicks</span>
      </div>

      <div className="col-md-12">
        {categories.map((c, i) => (
          <span key={i} className="badge text-success">
            {c.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default PopularLinks;
