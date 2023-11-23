import { configureStore } from "@reduxjs/toolkit";
import toDoListReducer from "./toDoListReducer";

export const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
