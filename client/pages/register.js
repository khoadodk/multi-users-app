import { useState, useEffect } from 'react';
import axios from 'axios';

import Layout from '../components/Layout';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const INITAL_USER = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [user, setUser] = useState(INITAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(element => Boolean(element));
    isUser ? setDisabled(false) : setDisabled(true);
    setError('');
  }, [user]);

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
      name: user.name,
      email: user.email,
      password: user.password
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        payload
      );
      setSuccess(response.data.message);
      setUser('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="col-md-8 offset-2">
        <h1 className="title">Register</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}
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
      </div>
    </Layout>
  );
};

export default Register;
