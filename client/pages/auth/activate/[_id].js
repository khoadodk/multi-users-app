import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'next/router';
import axios from 'axios';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';

const ActivateAccount = ({ router }) => {
  const INITAL_USER = {
    name: '',
    token: ''
  };
  const [user, setUser] = useState(INITAL_USER);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = router.query._id;
    if (token) {
      const { name } = jwt.decode(token);
      setUser({ name, token });
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/register/activate`, { token });
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <Layout>
      <div className="container text-center">
        <h1 className="title">Acccount Activation</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}

        <p>
          Hi <strong>{user.name}</strong>! Ready to activate your account?
        </p>
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Activate
        </button>
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
