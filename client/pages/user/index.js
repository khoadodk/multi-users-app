import Link from 'next/link';

import Layout from '../../components/Layout';
import withUser from '../withUser';
import Profile from '../../components/Profile';

const User = ({ user }) => {
  console.log(user);
  return (
    <Layout>
      {' '}
      <h1 className="title">User Dashboard</h1>
      <div className="container">
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
      </div>
    </Layout>
  );
};

export default withUser(User);
