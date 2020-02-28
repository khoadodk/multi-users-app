const Profile = ({ user }) => {
  const { username, name, email, role } = user;

  return (
    <div className="card mb-5">
      <h3 className="card-header">Profile</h3>
      <ul className="list-group">
        <li className="list-group-item">Username:&nbsp;{username}</li>
        <li className="list-group-item">Name:&nbsp;{name}</li>
        <li className="list-group-item">Email:&nbsp;{email}</li>
        <li className="list-group-item">Role:&nbsp;{role}</li>
      </ul>
    </div>
  );
};

export default Profile;
