import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Message } from '../../Message/Message'
import { Send } from '../../Send/Send'
import './style.sass';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSendMsg } from '../../../store/slices/msgSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { TMessage } from '../../../store/slices/msgSlice';

interface IProps {
  chatId: string
  messageList: Array<TMessage>
}

export const MessageList = () => {
  const {chatId, messageList} = useOutletContext<IProps>();
  const dispatch = useDispatch<AppDispatch>();
  const byEnter = useSelector((state:RootState) => state.profile.byEnter);
  const mesRef = useRef();

  const sendMessage = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const el = document.querySelector('#reply');
    el.value ? dispatch(fetchSendMsg({chatId: chatId, name: 'Anna Lukhanina', id: 2, text: el.value, mesType: 'sent'})) : '';
    el.value = '';
  }   

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author?.id === 2) {
      const timer = setTimeout(() => {
        dispatch(fetchSendMsg({chatId: chatId}))
      }, 1000)
    }}, [messageList])

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && event.shiftKey) {} 
    else if (event.code === 'Enter' && byEnter) {
      sendMessage(event)
    }
  }

  const listMessage = messageList?.map((el, idx) => {
    if (idx === messageList?.length - 1) {
      return (
        <div ref={mesRef} key={idx + 1}>
          <Message message={el} />
        </div>)
    }
    else return (
      <Message message={el} key={idx + 1} />)
  });

  useLayoutEffect(() => {
    const timer = setTimeout(() =>
      mesRef?.current?.scrollIntoView(), 100);
  }, [messageList]);

  return (
    <div className='message-list'>
      <div className='message-list__list'>
        {listMessage}
      </div>
      <Send handleChange={handleChange} sendMessage={sendMessage} />
    </div>
  )
}
