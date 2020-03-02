const SuccessMessage = ({ success }) => {
  return (
    <div className="alert alert-success text-center">
      <strong>{success}</strong>
    </div>
  );
};

export default SuccessMessage;
