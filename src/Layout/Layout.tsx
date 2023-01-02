import React, { useEffect } from 'react';
import './css/style.sass'
import { ChatList } from '../components/containers/ChatList/ChatList';
import { Header } from '../components/Header/Header'
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Outlet, useParams } from 'react-router-dom';
import { fetchMsg } from '../store/slices/msgSlice';
import { AppDispatch, RootState } from '../store/store';
import { theme } from '../Theme';


export const Layout = () => {
  const { chatId } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const {chats, status, error} = useSelector((state:RootState) => state.msg);
  const messageList = chats[chatId]?.messages || chats[Object.keys(chats).length]?.messages;

  useEffect(() => {
    dispatch(fetchMsg());
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ChatList chats={chats} status={status} error={error}/>
      <Outlet context={{chatId, messageList}}/>
    </ThemeProvider>
  )
}
