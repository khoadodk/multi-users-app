import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';

const Admin = ({ user }) => {
  console.log(user);
  return <Layout></Layout>;
};

export default withAdmin(Admin);
