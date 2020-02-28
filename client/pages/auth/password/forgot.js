import { useState, useEffect } from 'react';
import axios from 'axios';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, [email]);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API}/forgot-password`, { email });
      if (response) {
        setSuccess(response.data.message);
      } else {
        setError(error.response.data.error);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Forgot Password</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}
        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange}
              type="email"
              className="form-control"
              value={email}
              required
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
    </Layout>
  );
};

export default ForgotPassword;
