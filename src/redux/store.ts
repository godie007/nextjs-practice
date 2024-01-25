import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo-slice";
import sessionSlice from "./features/session-slice";
import visibilityReducer from "./features/visibility-slice";
export const store = configureStore({
  reducer: {
    todoReducer,
    sessionSlice,
    visibility: visibilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
