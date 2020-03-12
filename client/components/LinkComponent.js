import date from "../utils/formatDate";

const LinkComponent = ({ link, handleClickCount }) => {
  const {
    title,
    _id,
    url,
    clicks,
    createdAt,
    type,
    medium,
    postedBy,
    categories
  } = link;
  return (
    <>
      <div className="col-md-8">
        <h5 className="pt-2">{title}</h5>
        <a href={url} target="_blank" onClick={() => handleClickCount(_id)}>
          <p className="pt-2 mb-0">{url}</p>
        </a>
      </div>
      <div className="col-md-4 pt-2">
        <h5 className="text-danger">{clicks} Clicks</h5>
        <span className="pull-right">
          <span>
            {date(createdAt)} By
            <a href={"/profile/" + postedBy._id}>
              <strong> {postedBy.username}</strong>
            </a>
          </span>
        </span>
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
