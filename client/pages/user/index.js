import Link from 'next/link';
import axios from 'axios';

import withUser from '../withUser';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import date from '../../utils/formatDate';
import { API } from '../../config';

const User = ({ user, userLinks, token }) => {
  const confirmDelete = async _id => {
    await axios.delete(`${API}/link/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setTimeout(() => window.location.reload(true), 1000);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">User Dashboard</h1>

        <div className="row">
          <div className="col-md-4 mb-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/user/update">
                  <a>Update Profile</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <Profile user={user} />
          </div>
        </div>

        <div className="col-md-12">
          <h3 className="title text-center">Activity History</h3>
          {userLinks.length === 0 ? (
            <div className="text-center">
              <h4 className="text-danger">No posted links yet! :(</h4>
              Create one <a href="/user/link/create">here</a>
            </div>
          ) : (
            userLinks.map(link => (
              <div className="row alert alert-info p-2" key={link._id}>
                <div className="col-md-6">
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
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withUser(User);
