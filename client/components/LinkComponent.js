import date from '../utils/formatDate';

const LinkComponent = ({ link, handleClickCount }) => {
  return (
    <>
      <div className="col-md-8">
        <a
          href={link.url}
          target="_blank"
          onClick={() => handleClickCount(link._id)}
        >
          <h5 className="pt-2">{link.title}</h5>
          <p className="pt-2 mb-0">{link.url}</p>
        </a>
      </div>
      <div className="col-md-4 pt-2">
        <h5 className="text-danger">{link.clicks} Clicks</h5>
        <span className="pull-right">
          <span>
            {date(link.createdAt)} By
            <strong> {link.postedBy.name}</strong>
          </span>
        </span>
      </div>
      <div className="col-md-12">
        <span className="badge text-dark">
          {link.type} / {link.medium}
        </span>
        {link.categories.map((c, i) => (
          <span key={i} className="badge text-success">
            {c.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default LinkComponent;
