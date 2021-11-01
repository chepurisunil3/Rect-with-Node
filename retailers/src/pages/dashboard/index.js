import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Index = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <h1>Index Page</h1>;
};
Index.propTypes = {
  isLoggedIn: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
});
export default connect(mapStateToProps)(Index);
