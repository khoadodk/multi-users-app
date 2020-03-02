import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { API } from '../../../config';
import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
import ErrorMessage from '../../../components/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage';

const Read = ({ token }) => {
  const INITIAL_CATEGORY = [];
  const [categories, setCategories] = useState(INITIAL_CATEGORY);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const confirmDelete = async slug => {
    try {
      const response = await axios.delete(`${API}/category/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess(response.data.message);
      loadCategories();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setCategories(response.data);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Update Category</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}

        {categories.map(category => (
          <div key={category._id}>
            <div className="alert">
              <div className="row">
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src={category.image && category.image.url}
                    alt={category.name}
                    style={{ width: '100px', height: 'auto' }}
                    className="pr-3"
                  />
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                  <h3>
                    <a href={`/links/${category.slug}`}>{category.name}</a>
                  </h3>
                </div>
                <div className="col-md-4">
                  <Link href={`/admin/category/${category.slug}`}>
                    <a className="btn btn-sm btn-outline-warning btn-block mb-1">
                      Update
                    </a>
                  </Link>

                  <button
                    onClick={() =>
                      window.confirm(
                        'Are you sure you wish to delete this item?'
                      ) && confirmDelete(category.slug)
                    }
                    className="btn btn-sm btn-outline-danger btn-block"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default withAdmin(Read);
