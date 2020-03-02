import { useState, useEffect } from 'react';
import axios from 'axios';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage';
import withUser from '../../withUser';

const UpdateLink = ({ oldLink, token }) => {
  const [link, setLink] = useState(oldLink);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const { title, url, categories, type, medium, _id } = link;

  //   console.log(link);
  //   console.log(token);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setLoadedCategories(response.data);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setLink(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(false);
  };
  const handleClick = () => {
    const { name, value } = event.target;
    setLink(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(false);
  };
  // console.log(link);

  const handleToggle = c => () => {
    // check if cat is in the state
    const clickedCategory = link.categories.indexOf(c);
    const all = [...categories];
    // if not push the cat to the state
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      //  or splice it out
      all.splice(clickedCategory, 1);
    }
    console.log('all >> categories', all);
    setLink(prevState => ({
      ...prevState,
      categories: all
    }));
    setError(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.put(`${API}/link/${_id}`, link, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Update Link</h1>
        <div className="row">
          <div className="col-md-4">
            {/* Categories */}
            <div className="text-center">
              <h5>Categories</h5>
              {loadedCategories &&
                loadedCategories.map(c => (
                  <li className="list-unstyled " key={c._id}>
                    <input
                      type="checkbox"
                      onChange={handleToggle(c._id)}
                      className="mr-2"
                      checked={categories.includes(c._id)}
                    />
                    <label className="form-check-label">{c.name}</label>
                  </li>
                ))}
            </div>
            {/* Type */}
            <div className="row pt-3 d-flex justify-content-center">
              <h5>Type: &nbsp;</h5>
              <label className="form-check-label mr-2">
                <input
                  type="radio"
                  onClick={handleClick}
                  onChange={handleChange}
                  checked={type === 'free'}
                  value="free"
                  className="from-check-input"
                  name="type"
                />{' '}
                Free
              </label>

              <label className="form-check-label">
                <input
                  type="radio"
                  onClick={handleClick}
                  onChange={handleChange}
                  checked={type === 'paid'}
                  value="paid"
                  className="from-check-input"
                  name="type"
                />{' '}
                Paid
              </label>
            </div>

            {/* Medium */}
            <div className="row d-flex justify-content-center">
              <h5>Format: &nbsp;</h5>
              <label className="form-check-label mr-2">
                <input
                  type="radio"
                  onClick={handleClick}
                  onChange={handleChange}
                  checked={medium === 'video'}
                  value="video"
                  className="from-check-input"
                  name="medium"
                />{' '}
                Video
              </label>

              <label className="form-check-label">
                <input
                  type="radio"
                  onClick={handleClick}
                  onChange={handleChange}
                  checked={medium === 'book'}
                  value="book"
                  className="from-check-input"
                  name="medium"
                />{' '}
                Book
              </label>
            </div>
          </div>

          <div className="col-md-8">
            {success && <SuccessMessage success={success} />}
            {error && <ErrorMessage error={error} />}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={title}
                  name="title"
                />
              </div>
              <div className="form-group">
                <label className="text-muted">URL</label>
                <input
                  type="url"
                  className="form-control"
                  onChange={handleChange}
                  value={url}
                  name="url"
                />
              </div>
              <div>
                <button
                  disabled={!token}
                  className="btn btn-outline-primary float-right"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

UpdateLink.getInitialProps = async ({ token, query }) => {
  const response = await axios.get(`${API}/link/${query._id}`);
  return { oldLink: response.data, token };
};

export default withUser(UpdateLink);
