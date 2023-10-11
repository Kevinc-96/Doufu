import Spinner from 'react-bootstrap/Spinner';

function LoadBox() {
  return (
    <Spinner animation="border" role="status">
      {/* Show loading text if spinner can't be shown */}
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
export default LoadBox;
