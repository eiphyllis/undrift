import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function EditForm(props) {
  // console.log()
  const classes = useStyles();
  const [state, setState] = React.useState({right: false});
  const [name, setName] = React.useState(props.name);
  const [freq, setFreq] = React.useState(props.freq);
  const [social, setSocial] = React.useState(props.social);
  const [notes, setNotes] = React.useState(props.notes);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Controlled');

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

  const handleDelete = () => {
    console.log('deleting')
    setState({ ...state, ['right']: false});
    const options = {method: 'DELETE'};

    fetch(`http://localhost:3000/relationships/${props.id}`, options)
      .then(response => response.json())
      .then(data => {
         console.log('delete got back',  data)
         props.setRelList(data.relationships)
       // .map(relationship => relationship.id == component.key ? updated_object : relationship/don't do anything)
       //fetch person and updated relationships to render
      })//UI WILL NOT work if you put .catch so don't - even commented out 
  };

  const handleSave = (event) => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_id: props.user_id,
        name: name,
        social: social,
        freq: freq,
        notes: notes
      })
    };

    fetch(`http://localhost:3000/relationships/${props.id}`, options)
      .then(response => response.json())
      .then(data => {
          console.log('edit got back',  data)
         props.setRelList(data.relationships)

          setState({ ...state, ['right']: false});
          // orrrr refetch and populate the list (render the user from the backend instead) props.setRelList
            // .map(relationship => relationship.id == component.key ? updated_object : relationship/don't do anything)
      }) //UI WILL NOT work if you put .catch so don't - even commented out 
};

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
        <>

    <form className={classes.root} noValidate autoComplete="off">
      
      <FormControl >
        {/* <InputLabel htmlFor="component-simple">Name</InputLabel> */}
        <Input required={true} id="component-simple" value={name} onChange={handleChange} />
      </FormControl >
      <FormControl fullWidth={true}>
        {/* <InputLabel htmlFor="component-simple"> Social Media Link</InputLabel> */}
        <Input required id="component-simple" value={social} onChange={handleSocial} />
      </FormControl>
      <FormControl fullWidth={true} disabled>
        {/* <InputLabel htmlFor="component-disabled">Relationship</InputLabel> */}
        <Input id="component-disabled" value="Relationship" onChange={handleNotes} />
        <FormHelperText> Not enabled. </FormHelperText>
      </FormControl>
      <FormControl fullWidth={true} className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"> {freq}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleFreq}
        >
         <MenuItem value={'Weekly'}>Weekly</MenuItem>
          <MenuItem value={'Monthly'}>Monthly</MenuItem>
          <MenuItem value={'Yearly'}>Yearly</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth={true}
          id="standard-textarea"
          value={notes}
          multiline
          onChange={handleNotes}
        />
    </form>
    <ButtonGroup variant="contained" fullWidth="true" aria-label="contained primary button group">
        <Button variant="outlined" onClick={()=> setState({ ...state, ['right']: false})}> Cancel </Button>
        <Button  style={{
        background: 'linear-gradient(to right, #99e6ff 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        border: 0,
        borderRadius: 3,
        color: 'white'}} onClick={() => handleSave()}> Save </Button>
      </ButtonGroup>
      <Button component="span" display="block" variant="outlined" fullWidth="true" onClick={() => handleDelete()}style={{backgroundColor: '#992828', opacity: '0.45'}}> Delete</Button>

    </>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <ChevronRightRoundedIcon  style={{backgroundColor: '#71d0e4'}} onClick={toggleDrawer(anchor, true)} > </ChevronRightRoundedIcon>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}