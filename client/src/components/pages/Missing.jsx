import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="heading">
      <h2>Oops!</h2>
      <p>404 - no results found...</p>

      <Link className="btn btn-block" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default Missing;
