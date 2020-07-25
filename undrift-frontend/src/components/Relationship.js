import React from 'react';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import EditForm from './EditForm'
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
export default function Relationship(props) {
  const classes = useStyles();
  console.log()
  const handleClick = (event) => {
    alert('editing');
    // <EditForm> </EditForm>
  }
  return (<>
    <ListItem>
    <ListItemText primary={props.name} />
          <ListItemText secondary={props.freq} />
          <ListItemText secondary={props.notes} />
    <EditForm {...props}> </EditForm>
    </ListItem>
</>
  );
}
 // onClick={(event) => {alert('clicked')}} color="primary" aria-label="delete" size="large"