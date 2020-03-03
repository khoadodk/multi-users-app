import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';
import withUser from '../../withUser';
import { updateUser } from '../../../helpers/auth';

const UpdateProfile = ({ user, token }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [loadedCategories, setLoadedCategories] = useState([]);

  const { name, email, username, password, categories } = updatedUser;

  useEffect(() => {
    setError(false);
    loadCategories();
  }, [user]);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setLoadedCategories(response.data);
  };

  const handleToggle = c => () => {
    // check if cat is in the state
    const clickedCategory = categories && categories.indexOf(c);
    const all = [...categories];
    // if not push the cat to the state
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      //  or splice it out
      all.splice(clickedCategory, 1);
    }
    console.log('all >> categories', all);
    setUpdatedUser(prevState => ({
      ...prevState,
      categories: all
    }));
    setError(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password && password.length < 6 && password.length > 0) {
      setError('Password must be at least 6 character long');
      return;
    }

    const payload = {
      name,
      username,
      password,
      categories
    };
    try {
      const response = await axios.put(`${API}/user/update`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      updateUser(response.data, () => {
        setSuccess('Your profile was updated successfully!');
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Update Profile</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}

        <div className="row">
          {/* Category */}
          <div className="col-md-4">
            <h5>Select categories you are interested in:</h5>
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {loadedCategories &&
                loadedCategories.map((c, i) => (
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
            </ul>
          </div>

          <div className="col-md-8">
            <form>
              <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="btn btn-primary float-right"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withUser(UpdateProfile);
