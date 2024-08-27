import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthWrapper = ({ children }) => {
  const auth = useSelector((store) => store.auth);
  console.log(auth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
