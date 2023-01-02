import React from 'react';
import './style.sass';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
    
export const ChatList = ({chats, status, error}) => {
  const chatsList = Object.keys(chats).map(key => {
    return (
      <NavLink 
        className='w-100'
        to={`/chats/${key}`} key={key}
        style={({ isActive}) => ({
          backgroundColor: isActive? '#444a57' : ''
        })}>
        <ListItem >
          <ListItemAvatar>
            <Avatar alt={'Profile'} src={chats[key]?.avatar} />
          </ListItemAvatar>
          <ListItemText primary={chats[key]?.contactName} secondary={chats[key]?.messages[chats[key].messages.length - 1]?.text} />
        </ListItem>
      </NavLink>
    )
  }
  )

  return (
    <Box sx={{ pb: 7 }} className='chat-list'>
      <CssBaseline />
      {status === 'loading' && <h2>Loading...</h2>} 
      {error && <h2>An error occured: {error}</h2>}
      <List className='chats__list'>
        {chatsList}
      </List>
    </Box >
  );
}
