import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Relationship from './Relationship'
import Slide from 'react-reveal/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ViewList(props) {
  const classes = useStyles();
  return (
    <Slide bottom>
    <div className={classes.root}>
      <p style={{color: '#152238'}}>         Keep in touch with </p>
      <Divider style={{color: '#152238'}} />

      <List style={{ background: 'linear-gradient(#99e6ff 30%, #21CBF3 90%)'}} component="nav" aria-label="secondary mailbox folders">
        {props.relList.map(person =>
        <Relationship {...person} key={person.id} relList={props.relList} setRelList={props.setRelList}></Relationship>
        )}
      </List>
    </div>
    </Slide>
  );
}