import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import withAdmin from '../../withAdmin';
import Layout from '../../../components/Layout';
import date from '../../../utils/formatDate';
import { API } from '../../../config';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';

const AdminLinks = ({ token }) => {
  const INITIAL_LINKS = [];
  const [links, setLinks] = useState(INITIAL_LINKS);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const response = await axios.post(
        `${API}/links`,
        { skip, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLinks(response.data.links);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const confirmDelete = async _id => {
    const response = await axios.delete(`${API}/link/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setSuccess(response.data.message);
    setTimeout(() => window.location.reload(true), 2000);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">All Links</h1>
        {success && <SuccessMessage success={success} />}
        {error && <ErrorMessage error={error} />}

        {links &&
          links.map(link => (
            <div className="row alert alert-info p-2" key={link._id}>
              <div className="col-md-6 text-center">
                <a href={link.url} target="_blank">
                  <h6 className="pt-2">{link.title}</h6>
                </a>
              </div>
              <div className="col-md-4 pt-2 text-center">
                <h5 className="text-danger">{link.clicks} Clicks</h5>
                <span className="pull-right">
                  <span>
                    {date(link.createdAt)} By
                    <strong> {link.postedBy.name}</strong>
                  </span>
                </span>
              </div>

              {/* update */}
              <div className="col-md-2 pt-2">
                <Link href={`/user/link/${link._id}`}>
                  <a className="btn btn-sm btn-outline-warning btn-block mb-1">
                    Update
                  </a>
                </Link>
                {/* delete */}
                <button
                  onClick={() =>
                    window.confirm(
                      'Are you sure you wish to delete this item?'
                    ) && confirmDelete(link._id)
                  }
                  className="btn btn-sm btn-outline-danger btn-block"
                >
                  Delete
                </button>
              </div>

              <div className="col-md-12">
                <span className="badge text-dark">
                  {link.type} / {link.medium}
                </span>
                {link.categories.map(c => (
                  <span key={c._id} className="badge text-success">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default withAdmin(AdminLinks);
