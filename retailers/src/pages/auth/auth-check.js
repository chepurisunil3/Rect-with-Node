import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const AuthChecker = ({ isLoading, isLoggedIn }) => {};
AuthChecker.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
  isLoading: state.loginDetails.isLoading,
});
export default connect(mapStateToProps)(AuthChecker);
