import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
const Landing = ({ isLoggedIn, isLoading }) => {
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
    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Redirect to="/login" />;
    }
  }
};
Landing.protoTypes = {
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
  isLoading: state.loginDetails.isLoading,
});
export default connect(mapStateToProps)(Landing);
