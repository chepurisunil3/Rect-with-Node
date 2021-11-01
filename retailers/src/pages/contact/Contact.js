import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
const Contact = ({ isLoggedIn, isLoading }) => {
  if (isLoading) {
    return (
      <Box
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        width="100vw"
        height="100vh"
        bgcolor="primary.main"
      >
        Loading...
      </Box>
    );
  } else {
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <h1>Contact us Page</h1>
          <Link to="/dashboard">Home Page</Link>
        </div>
      );
    }
  }
};
Contact.protoTypes = {
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
  isLoading: state.loginDetails.isLoading,
});
export default connect(mapStateToProps)(Contact);
