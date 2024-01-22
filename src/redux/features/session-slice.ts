import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';


export type SessionState = {
  token: string;
};

const initialState: SessionState = {
  token: "",
};

function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');

    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null; // Si no se encuentra la cookie
}
export const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addSession: (state, action) => {
      state.token = action.payload;
    },
    removeSession: (state, action) => {
      state.token = "";
    },
    loadTokenFromLocalStorage: (state) => {
      try {
        const serializedState = getCookieValue('token');
        if (serializedState === null) {
          return undefined;
        }
        // console.log("loadTokenFromLocalStorage", serializedState);
        
        state.token = serializedState;
      } catch (e) {
        console.warn(e);
        return undefined;
      }
    }
  },
});

export const { addSession, removeSession, loadTokenFromLocalStorage } = session.actions;
export default session.reducer;
