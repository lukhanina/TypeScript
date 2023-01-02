import { createSlice } from '@reduxjs/toolkit';

const initialState:IInitialState = {
  byEnter: true
}

interface IInitialState {
  byEnter: boolean
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    byEnter: (state: IInitialState, action) => {
      return {
        ...state,
        byEnter: !state.byEnter
      }
    }
  }
})

export default profileSlice.reducer;
export const { byEnter } = profileSlice.actions;
