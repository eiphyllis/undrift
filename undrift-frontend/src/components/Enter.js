import React from 'react';
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
function Copyright() {
  return (
    <p> Welcome to keeping in touch. </p>
  );
}

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

export default function Enter(props) {
  const classes = useStyles();
  const [nameLogin, setNameLogin] = React.useState('');
  const [showError, setShowError] = React.useState(false)
  const [password, setPW] = React.useState('')
  
  const handleChange = (event) => {
    setNameLogin(event.target.value);
    setShowError(false)
  };

  const handlePW = (event) => {
    setPW(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nameLogin == ''){
      setShowError(true)

      console.log('hi')
    }else {
    // console.log('signing in')
    console.log(password)

    const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: {
            name: nameLogin,
            password: password
    }}) };
      fetch('http://localhost:3000/login', options)
      //make sure url matches either log in or sign up 
          .then(response => response.json())
          .then(data => {
              // this.setState({ postId: data.id })
               console.log('got back', data)
                // props.setRelList(
                //   [...props.relList, {...data }]
                // )
          })
    }
            //UI WILL NOT work if you put .catch so don't - even commented out 
};
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <form className={classes.form} noValidate>
          <TextField
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
    /> <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlePW}
      />

          
          
            <FormControlLabel
              control={<Checkbox value="remember" style={{color: '#21CBF3'}}/>}
              label="Remember me"
            />
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
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button style={{color: '#99e6ff'}} variant="body2">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button style={{color: '#21CBF3'}} variant="body2" onClick={(event) => {props.passToggle()}}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>

            <Box mt={5}>

              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}