import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import "./register.css";
import {
  Box,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { registerUser } from "../../redux/actions/login-details";
const Register = ({ isLoggedIn, registerUser }) => {
  const [companyName, setcompanyName] = useState("");
  const [companyNameError, setcompanyNameError] = useState(false);
  const [companyNameHelperText, setcompanyNameHelperText] = useState("");

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [userNameHelperText, setUserNameHelperText] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setconfirmPasswordHelperText] =
    useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [mobileNumberHelperText, setMobileNumberHelperText] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [dpSrc, setDpSrc] = useState(null);

  const addUser = (event) => {
    if (
      userNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      mobileNumberError
    ) {
      return;
    }
    let formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("contactNumber", mobileNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", confirmPassword);
    formData.append("contactName", userName);
    if (profilePicture != null) {
      formData.append("companyLogo", profilePicture);
    }
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("http://localhost:3001/retailers/addUser", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          const token = responseJson.token;
          registerUser({
            type: "REGISTER_SUCCESS",
            payload: { ...responseJson.data, token, isLoggedIn: true },
          });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelUpload = (event) => {
    console.log("Cancelled");
    setProfilePicture(null);
    setDpSrc(null);
  };

  const selectedFile = (event) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setDpSrc(e.target.result);
      setProfilePicture(event.target.files[0]);
    };
    reader.readAsDataURL(event.target.files[0]);
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
          error={companyNameError}
          className="default-input"
          style={{ textAlign: "left", marginBottom: "10px" }}
          value={companyName}
          helperText={companyNameHelperText}
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setcompanyName,
              setcompanyNameError,
              setcompanyNameHelperText
            );
          }}
          label="Name*"
        ></TextField>
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
          error={mobileNumberError}
          helperText={mobileNumberHelperText}
          style={{ textAlign: "left", marginBottom: "10px" }}
          value={mobileNumber}
          type="number"
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setMobileNumber,
              setMobileNumberError,
              setMobileNumberHelperText
            );
          }}
          label="Mobile Number*"
        ></TextField>
        <TextField
          className="default-input"
          error={userNameError}
          helperText={userNameHelperText}
          style={{ textAlign: "left", marginBottom: "10px" }}
          value={userName}
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setUserName,
              setUserNameError,
              setUserNameHelperText
            );
          }}
          label="Contact Name*"
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
        <TextField
          className="default-input"
          error={confirmPasswordError}
          helperText={confirmPasswordHelperText}
          style={{ textAlign: "left", marginBottom: "10px" }}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            updateTextFields(
              e.target.value,
              setConfirmPassword,
              setconfirmPasswordError,
              setconfirmPasswordHelperText
            );
          }}
          label="Confirm Password*"
        ></TextField>
        <Input
          onChange={selectedFile}
          id="dp-file"
          type="file"
          style={{ display: "none" }}
        />
        <Grid
          style={{ marginTop: 10, position: "relative" }}
          container
          wrap="nowrap"
          alignItems="center"
        >
          {profilePicture === null ? (
            <Typography className="para">Select a Profile Picture</Typography>
          ) : (
            <>
              <CloseIcon className="close-icon" onClick={cancelUpload} />
              <img
                alt="Profile Pic"
                src={dpSrc}
                style={{ width: 75, height: 75, margin: 5, borderRadius: 5 }}
              />
            </>
          )}

          <Button
            onClick={(event) => {
              document.getElementById("dp-file").click();
            }}
            style={{ background: "#B980F0", color: "white" }}
          >
            Choose File
          </Button>
        </Grid>
        <Button
          onClick={addUser}
          style={{ color: "white", marginTop: "30px" }}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
      <a className="links" href="/login">
        Already an user? Login
      </a>
    </Box>
  );
};
Register.propTypes = {
  isLoggedIn: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loginDetails.isLoggedIn,
});
export default connect(mapStateToProps, { registerUser })(Register);
