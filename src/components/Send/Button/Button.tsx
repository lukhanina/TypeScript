import React from 'react';
import './style.sass';
import SendIcon from '@mui/icons-material/Send';
import { ISend } from '../Send';

export const Button = ({sendMessage}: ISend) => {
  return (
    <button className='input-group__i' type='submit' onClick={sendMessage}>
      <SendIcon />
    </button >)
}
