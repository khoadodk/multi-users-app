import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import { API } from '../config';
import Layout from '../components/Layout';
import ErrorMessage from '../components/ErrorMessage';
import { authenticate } from '../helpers/auth';

const Login = () => {
  const INITAL_USER = {
    email: '',
    password: ''
  };
  const [user, setUser] = useState(INITAL_USER);
  const [error, setError] = useState('');

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
      email: user.email,
      password: user.password
    };
    try {
      const response = await axios.post(`${API}/login`, payload);
      authenticate(response, () => Router.push('/'));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="col-md-8 offset-2">
        <h1 className="title">Log In</h1>

        {error && <ErrorMessage error={error} />}
        <form>
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

          <button
            onClick={handleSubmit}
            className="btn btn-primary float-right"
          >
            Log In
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
