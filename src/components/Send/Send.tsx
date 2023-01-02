import React from 'react';
import './style.sass';
import { Textarea } from './Textarea/Textarea';
import { Button } from './Button/Button';

export interface ISend {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Send = ({handleChange, sendMessage}:ISend) => {
  return (
    <form className='input-group'>
      <Textarea handleChange={handleChange} />
      <Button sendMessage={sendMessage} />
    </form>
  )
}
