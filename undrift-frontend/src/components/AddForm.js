import React, { Component } from 'react';
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { Grid } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import ApiCalendar from 'react-google-calendar-api';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddForm(props) {
    const classes = useStyles();
  const [name, setName] = React.useState('');
  const [freq, setFreq] = React.useState('Weekly');
  const [social, setSocial] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Controlled');
  const [showError, setShowError] = React.useState(false)
// console.log('add form props ', props) 
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleSocial = (event) => {
    setSocial(event.target.value);
  };
  const handleFreq = (event) => {
    setFreq(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    if (name == ''){
      setShowError(true)
    }else {
// daily, weekly, monthly, annually
      let date = new Date()
      console.log(date)
      let year = date.getUTCFullYear()
      let month = `${date.getMonth()+1}`.padStart(2, '0')
      let day = date.getDate()
      let rupasVariable = `${year}-${month}-${day}`
      let event = {
        'summary': `Hit up ${name}!`,
        // fix the summary 
        // fix the notes
        'description': `${notes}`,
        'start': {
          'date': rupasVariable
          // custom to start frow now
          //custom to all day event
        },
        'end': {
          'date': rupasVariable
        },
        'recurrence': [
          `RRULE:FREQ=${freq};COUNT=4000`
          // 'RRULE:FREQ=WEEKLY;COUNT=52' conditionally render based on weekly, monthly, annually
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]}
      }
      ApiCalendar.createEvent(event, 'primary').then(console.log).catch(console.log)

    //make all day recurring event based on form inputs
    const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            user_id: props.user.id,
            name: name,
            social: social,
            freq: freq,
            notes: notes
          })
      };
      fetch('http://localhost:3000/relationships', options)
          .then(response => response.json())
          .then(data => {
            console.log('add got back', data)
              if (props.relList == []){
                props.setRelList(
                  [{...data }]
                )
                // console.log('if')
              } else {
                props.setRelList(
                  [...props.relList, {...data }]
                )
                // console.log('else')
              }
          })
    }
            //UI WILL NOT work if you put .catch so don't - even commented out 
};

  return (<>
   <Fade bottom>
    <form className={classes.root} noValidate autoComplete="off">
    {showError == true ? <TextField
      error
      id="outlined-error-helper-text"
      label="Name"
      // defaultValue="Hello World"
      helperText="Name is required."
      variant="outlined"
      onChange={handleChange}
      /> :
     <FormControl>
      <InputLabel htmlFor="component-simple">Name</InputLabel>
      <Input required={true} id="component-simple" placeholder="Susan" onChange={handleChange} />
      </FormControl>
    }
      
      <FormControl>
        <InputLabel htmlFor="component-simple"> Social Media Link</InputLabel>
        <Input required id="component-simple" placeholder="https://linkedin.com/in/profile" onChange={handleSocial} />
      </FormControl>
      <FormControl disabled>
        <InputLabel htmlFor="component-disabled">Relationship</InputLabel>
        <Input id="component-disabled" placeholder="Relationship" onChange={handleChange} />
        <FormHelperText> Not enabled. </FormHelperText>
      </FormControl>
      <br/>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"> Remind</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={freq}
          onChange={handleFreq}
        >
          <MenuItem value={'WEEKLY'}>Weekly</MenuItem>
          <MenuItem value={'MONTHLY'}>Monthly</MenuItem>
          <MenuItem value={'YEARLY'}>Yearly</MenuItem>
        </Select>
      </FormControl>
    <FormControl>

      <TextField
          id="standard-textarea"
          label="Notes"
          placeholder="Mock interview partner"
          multiline
          onChange={handleNotes}
        />
    </FormControl>
    <FormControl>

        <IconButton  onClick={(event) => {handleSubmit(event)}} color="primary" aria-label="delete" size="medium">
          <AddCircleRoundedIcon fontSize="inherit" />
        </IconButton>
    </FormControl>
       
    </form>
    </Fade>
    </>

  );
}