import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://cdn.dribbble.com/users/1147279/screenshots/5055958/dbbble.gif)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  export default function Signup (props) {
    const classes = useStyles();
    const [nameLogin, setNameLogin] = React.useState('');
    const [showError, setShowError] = React.useState(false)
    const [password, setPW] = React.useState('')
    const [confirmation, setConfirmation] = React.useState('')
    const [showPError, setShowPError] = React.useState(false)
    const [notFound, setNotFound] = React.useState(false)

    const handleChange = (event) => {
      setNameLogin(event.target.value);
      setShowError(false)
    };
    const confirm = (event) => {
        console.log('confirm is', confirmation)

        setConfirmation(event.target.value)
        console.log('updated confirm is', confirmation)

      };

    const handlePError = (event) => {
      setShowPError(event.target.value);
    };

    const handlePW = (event) => {
        console.log('pw is', password)

        setPW(event.target.value);
        console.log('updated pw is', password)


      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (confirmation === password){
        setShowError(true)
        console.log('Passwords do not match each other.')
      }else {
      const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: {
              name: nameLogin,
              password: password
      }}) };
        fetch('http://localhost:3000/signup', options)
        //make sure url matches either log in or sign up 
            .then(response => response.json())
            .then(data => {
                // this.setState({ postId: data.id })
                 console.log('signup got back', data)
                 if (data.error){
                    setNotFound(true)
                   }else {
                     props.dashboard(true)
                   }
                  // props.setRelList(
                  //   [...props.relList, {...data }]
                  // )
            })
      }
              //UI WILL NOT work if you put .catch even if it's commented out - so don't 
  };
    return (
     <>
   {notFound? <p style={{color: 'red'}}> Invalid account information. Please try again. </p> : ''}
           {nameLogin == '' ? <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      style={{color: '#21CBF3'}}
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      value={nameLogin}
      autoFocus
      onChange={handleChange}
      error={showError}
    /> :  <> <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      style={{color: '#21CBF3'}}
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      value={nameLogin}
      autoFocus
      onChange={handleChange}
      error={showError}
    /> <Slide right> <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      error={showError}
        onChange={handlePW}
      />  </Slide> <Slide right> <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Confirm password"
      type="password"
      id="password"
      error={showError}
      onChange={confirm}

    />  </Slide> </>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  background: 'linear-gradient(45deg, #99e6ff 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  border: 0,
                  borderRadius: 3,
                  color: 'white'
              }} 
                className={classes.submit}
                onClick={(event) => {handleSubmit(event)}}
              >
                Create account
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Button style={{color: '#21CBF3'}} variant="body2" onClick={(event) => {props.signup(!props.showLogin)}}>
                    {"Already have an account? Login"}
                  </Button>
                </Grid>
              </Grid>
              </>
    );
  }