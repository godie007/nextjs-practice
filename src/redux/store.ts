import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todo-slice';
import sessionSlice from './features/session-slice';
export const store = configureStore({
  reducer: {
    todoReducer,
    sessionSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
