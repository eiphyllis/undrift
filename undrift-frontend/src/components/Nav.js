import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Bounce from 'react-reveal/Bounce';

// ------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [relList, setRelList] = React.useState([]);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    props.setDashboard(false)
    props.setRelList([])
    props.setUser(null)
  };

  return (
    <>
    <div className={classes.root}>
      <AppBar  style={{
        background: 'linear-gradient(45deg, #99e6ff 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        border: 0,
        borderRadius: 3,
        color: 'white'
    }} position="static">

        <Toolbar>
        <img src='https://www.netclipart.com/pp/m/101-1010852_png-50-px-boat-clipart-transparent-background.png' style={{height: 30, width: 30}} alt="Logo" />
    
        <Typography variant="h6" className={classes.title}>
                        Undrift
          </Typography>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              {props.dashboard ? <Typography color="inherit"> Welcome back, {props.user.name} ! </Typography> : ''}

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </div>
          )}
          {props.dashboard ? <Button onClick={handleClick} color="inherit">Logout</Button> : <Button color="inherit">Login</Button>}

        </Toolbar>
      </AppBar>
    </div>

    </>
  );
}