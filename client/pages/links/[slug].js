import { useState, useEffect } from 'react';
import axios from 'axios';

import { API } from '../../config';
import Layout from '../../components/Layout';
import LinkComponent from '../../components/LinkComponent';
import PopularLinks from '../../components/PopularLinks';

const Links = ({ links, category, linksLimit }) => {
  const [allLinks, setAllLinks] = useState(links);
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(links.length);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    const response = await axios.get(`${API}/links/popular/${category.slug}`);
    setPopular(response.data);
  };

  const handleClickCount = async _id => {
    await axios.put(`${API}/click-count`, { _id });
  };

  const handleLoadMore = async () => {
    let toSkip = skip + limit;
    const response = await axios.post(`${API}/category/${category.slug}`, {
      skip: toSkip,
      limit
    });
    setAllLinks([...allLinks, ...response.data.links]);
    // console.log('allLinks', allLinks);
    // console.log('response.data.links.length', response.data.links.length);
    setSize(response.data.links.length);
    setSkip(toSkip);
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={handleLoadMore}
          className="btn btn-outline-primary btn-lg"
        >
          Load More
        </button>
      )
    );
  };

  return (
    <Layout>
      <div className="container ">
        <h1 className="title">{category.name} Tutorials</h1>
        <div className="row">
          <div className="col-md-2 p-0 d-flex justify-content-center align-items-center mb-2">
            <img
              src={category.image.url}
              alt={category.name}
              style={{ width: 'auto', maxHeight: '120px' }}
            />
          </div>
          <div className="col-md-10">
            <div
              className="lead alert alert-secondary p-0 m-0"
              style={{
                backgroundColor: '#fcf8e3'
              }}
            >
              <p className="m-2">{category.content}</p>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="col-md-8">
            {allLinks.length === 0 ? (
              <div className="text-center">
                <h4 className="text-danger">No posted links yet! :(</h4>
                Create one <a href="/user/link/create">here</a>
              </div>
            ) : (
              allLinks.map(link => (
                <div className="row alert alert-info p-2" key={link._id}>
                  <LinkComponent
                    link={link}
                    handleClickCount={handleClickCount}
                  />
                </div>
              ))
            )}

            <div className="d-flex justify-content-center">
              {loadMoreButton()}
            </div>
          </div>

          <div className="col-md-4  pt-3">
            <h4 className="font-weight-bold text-center">
              Most popular in {category.name}
            </h4>
            <div className="p-3">
              {popular &&
                popular.map(link => (
                  <div className="row alert alert-warning r" key={link._id}>
                    <PopularLinks link={link} handleClick={handleClickCount} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Links.getInitialProps = async ({ query }) => {
  const slug = query.slug;
  let skip = 0;
  let limit = 4;
  const response = await axios.post(`${API}/category/${slug}`, { skip, limit });
  return {
    category: response.data.category,
    links: response.data.links,
    linksLimit: limit
  };
};

export default Links;
