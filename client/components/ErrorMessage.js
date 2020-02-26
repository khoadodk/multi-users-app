const ErrorMessage = ({ error }) => {
  return (
    <div class="alert alert-warning">
      <strong>{error}</strong>
    </div>
  );
};

export default ErrorMessage;
