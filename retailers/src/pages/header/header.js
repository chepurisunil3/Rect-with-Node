import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    color: "white",
  },
  links: {
    color: "white",
    margin: "0px 10px",
  },
  linksdiv: {
    marginRight: "10px",
    display: "inline-block",
  },
}));
const Header = ({ companyName, companyLogo }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#B980F0" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sunny Website
          </Typography>
          <div>
            <div className={classes.linksdiv}>
              <Link className={classes.links} to="/contact">
                Contact Us
              </Link>
              <Link className={classes.links} to="/contact">
                Products
              </Link>
            </div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <img
                width="30px"
                src="http://localhost:3001/static/retailers/logos/default-1631444762694.png"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
Header.propTypes = {
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
};
const mapStateToProps = (state) => ({
  companyName: state.loginDetails.companyName,
  companyLogo: state.loginDetails.companyLogo,
});
export default connect(mapStateToProps)(Header);
