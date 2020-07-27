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
// console.log('viewlist receives', props)
  const classes = useStyles();
  return (
    <Slide bottom>
    <div className={classes.root}>
      <p> Keep in touch with </p>
      <Divider />
    
   {/* {fetch('https://localhost:3000/relationships')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setRelList(data)
        }
            // this.setState({ postId: data.id })
        )} */}

      <List component="nav" aria-label="secondary mailbox folders">
        {props.relList.map(person =>
        <Relationship {...person} key={person.id} relList={props.relList} setRelList={props.setRelList}></Relationship>
        )}
      </List>
    </div>
    </Slide>
  );
}