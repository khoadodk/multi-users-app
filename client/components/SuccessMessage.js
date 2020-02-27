const SuccessMessage = ({ success }) => {
  return (
    <div className="alert alert-success">
      <strong>{success}</strong>
    </div>
  );
};

export default SuccessMessage;
