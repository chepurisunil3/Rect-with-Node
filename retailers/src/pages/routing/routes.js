import { Redirect, Route, Switch } from "react-router";
import Contact from "../contact/Contact";
import Index from "../dashboard";
import Login from "../login/Login";
import Register from "../register/Register";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import Header from "../header/header";
const Routes = ({ isLoading, isLoggedIn }) => {
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
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Index} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </>
      );
    }
  }
};
Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
  isLoading: state.loginDetails.isLoading,
});
export default connect(mapStateToProps)(Routes);
