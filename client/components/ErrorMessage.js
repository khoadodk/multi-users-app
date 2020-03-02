const ErrorMessage = ({ error }) => {
  return (
    <div className="alert alert-warning text-center">
      <strong>{error}</strong>
    </div>
  );
};

export default ErrorMessage;
