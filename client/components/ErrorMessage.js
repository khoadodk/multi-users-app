const ErrorMessage = ({ error }) => {
  return (
    <div className="alert alert-warning">
      <strong>{error}</strong>
    </div>
  );
};

export default ErrorMessage;
