import Link from 'next/link';

import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';
import Profile from '../../components/Profile';

const Admin = ({ user }) => {
  console.log(user);

  return (
    <Layout>
      <h1 className="title">Admin Dashboard</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/user/update">
                  <a>Update Profile</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/category/create">
                  <a>Category</a>
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

export default withAdmin(Admin);
