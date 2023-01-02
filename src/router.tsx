import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageList } from './components/containers/MessageList/MessageList';
import { Profile } from './components/containers/Profile/Profile';
import { Layout } from './Layout/Layout';

export const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="chats" >
          <Route path=":chatId" element={<MessageList />}/>
        </Route>
        <Route path="profile" element={<Profile />}/>
      </Route>
      <Route path="*" element={<h1>Sorry, page not found</h1>} />
    </Routes>
  )
}
