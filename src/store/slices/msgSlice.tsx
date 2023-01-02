import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import '../../components/containers/ChatList/static/images/avatar/robot.png';
import '../../components/containers/ChatList/static/images/avatar/girl.jpg';

const initialState:IInitialState = {
  chats: {},
  status: null,
  error: null
}

interface IInitialState {
  chats: IChats<IChat>,
  status: string | null,
  error: string | null
}

interface IChats<T> {
  [key: string]: T
}

export interface IChat {
  contactName?: string;
  avatar?: string;
  messages?: Array<TMessage>
}

export type TMessage = {
  author?: TAuthor;
  date?: string;
  id?: string;
  text?: string;
  time?: string;
  type?: 'received' | 'sent'
};

type TAuthor = {
  name?: string;
  id?: number
};

interface ISend {
  chatId: string;
  name?: string;
  id?: number;
  text?: string;
  mesType?: string;
}

interface ISendMsg {
  data: TMessage;
  chatId: string
}

export const fetchMsg = createAsyncThunk<IChats<IChat>, undefined, {rejectValue:string}>(
  'msg/fetchMsg',
  async function (_, {rejectWithValue}) {
    const res = await fetch('/api/getMessages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      rejectWithValue(`Network response was not OK, error ${res.status}`);
    }
    return (await res.json());
  }
)

export const fetchSendMsg = createAsyncThunk<ISendMsg, ISend, {rejectValue:string}>(
  'msg/fetchSendMsg',
  async function ({ chatId, name, id, text, mesType }, {rejectWithValue}) {
    const res = await fetch('/api/postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, name, id, text, mesType })
    });
    if (!res.ok) {
      rejectWithValue(`Network response was not OK, error ${res.status}`);
    }
    const data = await res.json();
    return({data, chatId});
  }
)

const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMsg.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMsg.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.chats = action.payload;
      })
      .addCase(fetchSendMsg.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSendMsg.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.chats[action.payload.chatId].messages.push(action.payload.data)
      })
  }
})

export default msgSlice.reducer;
