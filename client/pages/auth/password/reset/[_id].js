import { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';

import { API } from '../../../../config';
import Layout from '../../../../components/Layout';
import SuccessMessage from '../../../../components/SuccessMessage';
import ErrorMessage from '../../../../components/ErrorMessage';

const ResetPassword = ({ router }) => {
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, [password]);

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { token: router.query._id, newPassword: password };
      const response = await axios.put(`${API}/reset-password`, payload);

      setSuccess(response.data.message);
      setPassword('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Reset Password</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}
        <form>
          <div className="form-group">
            <label className="text-muted">Enter a new password</label>
            <input
              onChange={handleChange}
              type="password"
              className="form-control"
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
    </Layout>
  );
};

export default withRouter(ResetPassword);
