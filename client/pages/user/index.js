import Layout from '../../components/Layout';
import withUser from '../withUser';

const User = ({ user }) => {
  console.log(user);
  return <Layout></Layout>;
};

export default withUser(User);
