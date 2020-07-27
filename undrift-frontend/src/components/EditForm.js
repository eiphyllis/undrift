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
  const [state, setState] = React.useState({
    right: false
  });
  const [name, setName] = React.useState('Name');
  const [freq, setFreq] = React.useState('Weekly');
  const [social, setSocial] = React.useState('https://wwww.linkedin.com/in/profile');
  const [notes, setNotes] = React.useState('Notes');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    // console.log('name is', event.target.value)
    // console.log(props.id)
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

  const handleSave = (event) => {
    console.log('name', name, 'id', props.id, 'social', social, 'freq', freq, 'notes', notes)

    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_id: 1,
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
           console.log('find', props.relList)
          // find matching id in array
            // props.setRelList(
            //   [...props.relList, {...data }]
            // )
            // if (props.relList == []){
            //   props.setRelList(
            //     [{...data }]
            //   )
            //   // console.log('if')
            // } else {
            //   props.setRelList(
            //     [...props.relList, {...data }]
            //   )
            //   // console.log('else')
            // }
            toggleDrawer('right', false)

      })
            //UI WILL NOT work if you put .catch so don't - even commented out 
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
      
      <FormControl fullWidth={true}>
        {/* <InputLabel htmlFor="component-simple">Name</InputLabel> */}
        <Input required={true} id="component-simple" placeholder={props.name} onChange={handleChange} />
      </FormControl >
      <FormControl fullWidth={true}>
        {/* <InputLabel htmlFor="component-simple"> Social Media Link</InputLabel> */}
        <Input required id="component-simple" placeholder={props.social} onChange={handleSocial} />
      </FormControl>
      <FormControl fullWidth={true} disabled>
        {/* <InputLabel htmlFor="component-disabled">Relationship</InputLabel> */}
        <Input id="component-disabled" placeholder="Relationship" onChange={handleNotes} />
        <FormHelperText> Not enabled. </FormHelperText>
      </FormControl>
      <FormControl fullWidth={true} className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label"> {props.freq}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleFreq}
        >
         <MenuItem value={'Weekly'}>Weekly</MenuItem>
          <MenuItem value={'Biweekly'}>Biweekly</MenuItem>
          <MenuItem value={'Monthly'}>Monthly</MenuItem>
          <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
          <MenuItem value={'Yearly'}>Yearly</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth={true}
          id="standard-textarea"
          label={props.notes}
          multiline
          onChange={handleNotes}
        />
    </form>
    <ButtonGroup variant="contained" aria-label="contained primary button group">
        <Button variant="outlined"> Cancel </Button>
        <Button  style={{
        background: 'linear-gradient(to right, #99e6ff 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        border: 0,
        borderRadius: 3,
        color: 'white'}} onClick={() => handleSave()}> Save </Button>
      </ButtonGroup>
    </>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <ChevronRightRoundedIcon  onClick={toggleDrawer(anchor, true)} > </ChevronRightRoundedIcon>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}