import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddForm from './components/AddForm'
import MenuIcon from '@material-ui/icons/Menu';
import ViewList from './components/ViewList'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Nav from './components/Nav'
import Enter from './components/Enter';
import Signup from './components/Signup'
import ApiCalendar from 'react-google-calendar-api';
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

export default function MenuAppBar() {
  const classes = useStyles();
  const [relList, setRelList] = React.useState([])
  const [dashboard, setDashboard] = React.useState(false);
  const [user, setUser] = React.useState(null);

  
  return (<>
      <Nav setDashboard={setDashboard} dashboard={dashboard} setRelList={setRelList} user={user} setUser={setUser}> </Nav>
      {dashboard ?   <><AddForm user={user} relList={relList} setRelList={setRelList}/>
      <ViewList relList={relList}/></> : <Enter setUser={setUser} setRelList={setRelList} setDashboard={setDashboard}/> }
      {/* <AddForm relList={relList} setRelList={setRelList}/>
      <ViewList relList={relList}/> */}
      </>
    );
}