import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { API } from '../config';
import Layout from '../components/Layout';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const INITAL_USER = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    categories: []
  };
  const [user, setUser] = useState(INITAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [loadedCategories, setLoadedCategories] = useState([]);

  const { name, email, password, categories } = user;

  useEffect(() => {
    const isUser = Object.values(user).every(element => Boolean(element));
    isUser ? setDisabled(false) : setDisabled(true);
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
    setUser(prevState => ({
      ...prevState,
      categories: all
    }));
    setError(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      categories
    };
    try {
      const response = await axios.post(`${API}/register`, payload);
      setSuccess(response.data.message);
      setUser(INITAL_USER);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Register</h1>
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
                    />
                    <label className="form-check-label">{c.name}</label>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-8">
            <form>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Confirm Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={user.confirmPassword}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="btn btn-primary float-right"
                disabled={disabled}
              >
                Submit
              </button>
            </form>
            <p>
              Already have an account?{' '}
              <Link href="/login">
                <a>Login Here</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
