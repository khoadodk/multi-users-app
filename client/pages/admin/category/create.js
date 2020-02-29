import { useState, useEffect } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
import ErrorMessage from '../../../components/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage';

const CreateCategory = ({ token }) => {
  const INITIAL_STATE = { name: '', content: '', image: '' };
  const [state, setState] = useState(INITIAL_STATE);
  const [imageUploadButtonName, setImageUploadButtonName] = useState(
    'Upload Image'
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { name, content, image } = state;

  useEffect(() => {
    setError(false);
  }, [state]);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImage = event => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    setImageUploadButtonName(event.target.files[0].name);
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          // console.log(uri);
          setState({ ...state, image: uri });
        },
        'base64'
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/category`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess(response.data.message);
      setState(INITIAL_STATE);
      setImageUploadButtonName('Upload Image');
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Register</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={name}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Content</label>
            <textarea
              name="content"
              value={content}
              onChange={handleChange}
              rows="5"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="btn btn-outline-secondary">
              {imageUploadButtonName}
              <input
                onChange={handleImage}
                type="file"
                accept="image/*"
                className="form-control"
                hidden
              />
            </label>
          </div>
          <div>
            <button className="btn btn-outline-primary float-right">
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withAdmin(CreateCategory);
