import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../redux/actions/login-details";
import { Redirect } from "react-router";

const Login = ({ isLoggedIn, registerUser }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const loginUser = async (event) => {
    if (emailError || passwordError) {
      return;
    }
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(
      `http://localhost:3001/retailers/checkLogin?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
      requestOptions
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      if (!responseJson.success) {
        const errors = responseJson.errors;
        if (errors.hasOwnProperty("email")) {
          setEmailHelperText(errors.email.msg);
          setEmailError(true);
        }
        if (errors.hasOwnProperty("password")) {
          setPasswordError(errors.password.msg);
          setPasswordError(true);
        }
      } else {
        const token = responseJson.token;
        registerUser({
          type: "REGISTER_SUCCESS",
          payload: { ...responseJson.data, token },
        });
      }
    } else {
      alert("internal error");
    }
  };

  const updateTextFields = (value, valueSet, valueErrorSet, helperTextSet) => {
    valueSet(value);
    if (value === "") {
      valueErrorSet(true);
      helperTextSet("Value cannot be empty");
    } else {
      valueErrorSet(false);
      helperTextSet("");
    }
  };
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      bgcolor="primary.main"
      width="100vw"
      minHeight="100vh"
      padding="20px"
      alignItems="center"
      position="relative"
    >
      <h4 className="website-name">Sunny Website</h4>
      <form>
        <TextField
          className="default-input"
          error={emailError}
          helperText={emailHelperText}
          style={{ textAlign: "left", marginBottom: "10px" }}
          value={email}
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setEmail,
              setEmailError,
              setEmailHelperText
            );
          }}
          label="Email*"
        ></TextField>
        <TextField
          className="default-input"
          error={passwordError}
          helperText={passwordHelperText}
          style={{ textAlign: "left", marginBottom: "10px" }}
          value={password}
          type="password"
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setPassword,
              setPasswordError,
              setPasswordHelperText
            );
          }}
          label="Password*"
        ></TextField>
        <Button
          onClick={loginUser}
          style={{ color: "white", marginTop: "30px" }}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
      <a className="links" href="/register">
        Don't have an account? Register
      </a>
    </Box>
  );
};
Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  registerUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
});
export default connect(mapStateToProps, { registerUser })(Login);
